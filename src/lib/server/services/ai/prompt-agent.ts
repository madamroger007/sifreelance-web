import type { ProjectFormSchema } from '$lib/shared/validators/project.schema';

type PricingContext = {
    currency: string;
    complexity: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    description?: string | null;
    deadline: string;
    projectType: string;
    projectName: string;
};

export function buildPricingSystemPrompt(input: PricingContext): string {
    return `
You are a professional market-accurate pricing engine.

You MUST detect project SCALE before calculating price.

STEP 1 — Determine Project Scale from ProjectName + Description:
- Micro Task (simple design, small edit, minor fix, 1 feature)
- Small Project (landing page, single feature app, simple CRUD)
- Standard Project (multi-page site, small system)
- Large System (dashboard, management system, SaaS)
- Enterprise (scalable, multi-role, complex integration)

STEP 2 — Use ProjectType EXACTLY as provided.
Classify into technical domain logically without downgrading scope.

STEP 3 — Detect economic tier from Currency:
Tier A (high-income)
Tier B (upper-middle)
Tier C (developing, e.g., IDR)

STEP 4 — Determine realistic freelance hourly rate
based on:
- Economic tier
- Domain
- Project scale

Example realistic Tier C (IDR mid-level):
Design simple = 50000–80000/hour
Web simple = 80000–100000/hour
Web system = 100000–130000/hour
SaaS / complex = 130000–170000/hour

Example realistic Tier B (IDR middle-income):
Design simple = 80000–100000/hour
Web simple = 100000–150000/hour
Web system = 150000–200000/hour
SaaS / complex = 200000–250000/hour

Example realistic Tier A (IDR high-income):
Design simple = 100000–150000/hour
Web simple = 150000–200000/hour
Web system = 200000–250000/hour
SaaS / complex = 250000–300000/hour

STEP 5 — BasePrice = HourlyRate × Deadline

STEP 6 — Apply Complexity multiplier:
LOW=1
MEDIUM=2.5
HIGH=4
URGENT=5

STEP 7 — Apply scope signals only if explicitly mentioned.

STEP 8 — Apply deadline pressure factor if compressed.

STEP 9 — Ensure:
- Micro tasks can result below 100,000 IDR.
- Small projects stay proportional.
- Systems are not underpriced.

Generate realistic range:
recommendedMin = Final × 0.9
recommendedMax = Final × 1.15

INPUT:
Currency=${input.currency}
ProjectName=${input.projectName}
ProjectType=${input.projectType}
Complexity=${input.complexity}
Deadline=${input.deadline}
Description=${input.description}

================ OUTPUT JSON ONLY ================

{
  "recommendedMin": number,
  "recommendedMax": number,
  "currency": "${input.currency}",
  "complexity": "${input.complexity}",
  "estimatedHours": ${input.deadline},
  "marketTier": "Tier A | Tier B | Tier C",
  "confidenceScore": number (0-100 based on clarity & consistency),
  "analysisSummary": "2-3 sentence explanation referencing scope, domain, and market tier.",
  "reasoning": [
    "Scope analysis from name + description",
    "Domain classification from project type",
    "Economic tier detection",
    "Hourly rate justification",
    "Base price calculation",
    "Complexity multiplier applied",
    "Scope adjustments",
    "Deadline factor applied"
  ]
}

STRICT RULES:
- Never downgrade complex systems to simple websites.
- Hourly rate must match country economy.
- All numbers must be numeric.
- Same input should produce consistent output.
- JSON only.
- No markdown.
`;
}



export function buildUserPrompt(input: ProjectFormSchema): string {
    return `
Calculate professional freelance pricing.

Currency=${input.currency}
ProjectName=${input.projectName}
ProjectType=${input.projectType}
Complexity=${input.complexity}
Deadline=${input.deadline}
Description=${input.description}

Ensure:
- Scope derived from ProjectName and Description
- Domain determined from ProjectType
- Market rate aligned with Currency economy
- Deadline validated against workload
- Complexity multiplier applied
- Scope adjustments applied if present
- Realistic price range generated

Return JSON only.
`;
}