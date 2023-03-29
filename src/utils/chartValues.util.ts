import { IRuleDots } from "src/models/rules.model";

export function getChartValues(data: IRuleDots): IRuleDots {
  const x: Array<number> = [...data.x]
  const y: Array<number> = [...data.y]

  const xLeft = Number(x[0].toString()[0]);
  const xRight = x[3];

  if (xLeft !== 0) {
    for (let step = xLeft - 1; step > 0; step--) {
      x.unshift(step * 10);
      y.unshift(0);
    }
  }

  if (xRight !== 100) {
    for (let step = Number(xRight.toString()[0]) + 1; step <= 10; step++) {
      x.push(step * 10);
      y.push(0);
    }
  }

  return {
    x,
    y
  }
}