<script lang="ts">
  export let revenueBreakdown: { day: string; revenue: number }[] = [];
  export let title: string = "Earnings Breakdown";
  export let label: string = "Net Revenue";

  // Tooltip state
  let tooltipVisible = false;
  let tooltipX = 0;
  let tooltipY = 0;
  let tooltipValue = 0;
  let tooltipDay = "";

  // Format currency
  function formatCurrency(value: number): string {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}k`;
    }
    return `$${value.toLocaleString()}`;
  }
  // Generate SVG path from revenue data
  function generateChartPath(breakdown: { day: string; revenue: number }[]): {
    fillPath: string;
    strokePath: string;
    points: { x: number; y: number; revenue: number; day: string }[];
  } {
    if (!breakdown || breakdown.length === 0) {
      return {
        fillPath: "M0,90 L100,90 L200,90 L300,90 L400,90 L400,100 L0,100 Z",
        strokePath: "M0,90 L100,90 L200,90 L300,90 L400,90",
        points: [],
      };
    }

    const maxRevenue = Math.max(...breakdown.map((d) => d.revenue), 1);
    const points = breakdown.map((d, i) => {
      const x = (i / (breakdown.length - 1)) * 400;
      const y = 90 - (d.revenue / maxRevenue) * 70; // Scale to 20-90 range
      return { x, y, revenue: d.revenue, day: d.day };
    });

    // Generate smooth curve path
    let strokePath = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      strokePath += ` Q${cpx},${prev.y} ${curr.x},${curr.y}`;
    }

    const fillPath = `${strokePath} L400,100 L0,100 Z`;

    return { fillPath, strokePath, points };
  }

  $: chartPaths = generateChartPath(revenueBreakdown);

  function showTooltip(
    event: MouseEvent,
    point: { x: number; y: number; revenue: number; day: string },
  ) {
    const svg = (event.target as Element).closest("svg");
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    tooltipX = (point.x / 400) * rect.width;
    tooltipY = (point.y / 100) * rect.height;
    tooltipValue = point.revenue;
    tooltipDay = point.day;
    tooltipVisible = true;
  }

  function hideTooltip() {
    tooltipVisible = false;
  }
</script>

<div class="card-component-container-2">
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-sm font-bold dark:text-white">{title}</h2>
      <div
        class="flex items-center gap-1 text-[10px] font-bold text-text dark:text-text-dark cursor-pointer"
      >
        <span class="w-2 h-2 rounded-full bg-primary"></span>
        {label}
      </div>
    </div>
    <div>
      <span class="text-xl font-bold tracking-tight dark:text-white"
        >{formatCurrency(
          chartPaths.points.reduce((total, point) => total + point.revenue, 0),
        )}</span
      >
      <div class="flex items-center gap-1 mt-1">
        <span class="text-[10px] text-emerald-600 font-bold">income</span>
        <span class="text-[10px] text-text dark:text-text-dark">today</span
        >
      </div>
    </div>
  </div>
  <div class="h-24 w-full relative">
    <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
      <defs>
        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#3713ec" stop-opacity="0.2"></stop>
          <stop offset="100%" stop-color="#3713ec" stop-opacity="0"></stop>
        </linearGradient>
      </defs>
      <path d={chartPaths.fillPath} fill="url(#chartFill)"></path>
      <path
        d={chartPaths.strokePath}
        fill="none"
        stroke="#3713ec"
        stroke-linecap="round"
        stroke-width="3"
      ></path>
      <!-- Interactive hover points -->
      {#each chartPaths.points as point}
        <circle
          cx={point.x}
          cy={point.y}
          r="12"
          fill="transparent"
          class="cursor-pointer"
          role="img"
          aria-label="Revenue for {point.day}: {formatCurrency(point.revenue)}"
          on:mouseenter={(e) => showTooltip(e, point)}
          on:mouseleave={hideTooltip}
        />
        <circle
          cx={point.x}
          cy={point.y}
          r="4"
          fill="#3713ec"
          class="pointer-events-none"
        />
      {/each}
    </svg>
    <!-- Tooltip -->
    {#if tooltipVisible}
      <div
        class="absolute bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full whitespace-nowrap z-10"
        style="left: {tooltipX}px; top: {tooltipY - 8}px;"
      >
        <div class="font-bold">{tooltipDay}</div>
        <div>{formatCurrency(tooltipValue)}</div>
      </div>
    {/if}
  </div>
  <div class="flex justify-between mt-2 px-1">
    {#each revenueBreakdown as item}
      <span class="text-[9px] font-bold text-text dark:text-text-dark"
        >{item.day}</span
      >
    {/each}
    {#if revenueBreakdown.length === 0}
      <span class="text-[9px] font-bold text-text dark:text-text-dark">MON</span
      >
      <span class="text-[9px] font-bold text-text dark:text-text-dark">TUE</span
      >
      <span class="text-[9px] font-bold text-text dark:text-text-dark">WED</span
      >
      <span class="text-[9px] font-bold text-text dark:text-text-dark">THU</span
      >
      <span class="text-[9px] font-bold text-text dark:text-text-dark">FRI</span
      >
    {/if}
  </div>
</div>
