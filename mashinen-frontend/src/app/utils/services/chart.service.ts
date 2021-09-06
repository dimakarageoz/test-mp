import * as d3 from 'd3';

export class ChartService {

  public static createLineChartByTimestamps(
    data: Array<[number, string]>,
    element: Element,
    timestampFormat: string,
    color: string = '#1785e2'
  ): void {
    const margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const parseTime = d3.timeParse(timestampFormat);

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const valueline = d3.line<[number, Date]>()
      .x(function (d) {
        return x(d[1]);
      })
      .y(function (d) {
        return y(d[0]);
      });

    const svg = d3.select(element).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const items = data.map((item: [number, string]) => ([item[0], parseTime(item[1])]));

    // @ts-ignore
    x.domain(d3.extent(items, function (d) {
      return d[1];
    }));

    // @ts-ignore
    y.domain([
      d3.min(items, function (d) {
        return d[0];
      }),
      d3.max(items, function (d) {
        return d[0];
      })
    ]);

    const path = svg.append("path")
      .data([items])
      .attr("class", "line")
      .attr('stroke', color)
      // @ts-ignore
      .attr("d", valueline);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));
  }
}
