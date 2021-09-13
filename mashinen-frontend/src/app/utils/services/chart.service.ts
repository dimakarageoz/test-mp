import * as d3 from 'd3';

type SelectorSvg = d3.Selection<SVGGElement, unknown, null, undefined>;

export class ChartService {

  public static createLineChartByTimestamps(
    data: Array<[number, string]>,
    element: HTMLElement,
    timestampFormat: string,
    color: string = '#1785e2'
  ): void {
    const [svg, height, width] = this.appendBaseSvg(element, 960, 500);

    const items = this.parseLineDataWithTimestamps(data, timestampFormat);

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // @ts-ignore
    x.domain(d3.extent(items, d => d[1]));

    // @ts-ignore
    y.domain([
      d3.min(items, d => d[0]),
      d3.max(items, d => d[0])
    ]);

    const valueLine = d3.line<[number, Date]>()
      .x(d => x(d[1]))
      .y(d => y(d[0]));

    svg.append("path")
      .data([items])
      .attr("class", "line")
      .attr('stroke', color)
      // @ts-ignore
      .attr("d", valueLine);

    this.appendAxios(svg, x, y, height);
  }

  private static parseLineDataWithTimestamps(
    data: Array<[number, string]>,
    timestampFormat: string,
  ): Array<[number, Date | null]> {
    const parseTime = d3.timeParse(timestampFormat);

    return data.map((item: [number, string]) => ([item[0], parseTime(item[1])]));
  }

  private static appendBaseSvg(rootElement: HTMLElement, width: number, height: number): [SelectorSvg, number, number] {
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(rootElement)
      .append('svg')
      .attr("width", chartWidth + margin.left + margin.right)
      .attr("height", chartHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    return [svg, chartHeight, chartWidth];
  }

  private static appendAxios(
    svg: SelectorSvg,
    x: d3.ScaleTime<number, number>,
    y: d3.ScaleLinear<number, number>,
    height: number
  ): void {
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));
  }
}
