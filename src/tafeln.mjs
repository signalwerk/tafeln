import { obj2html } from "./obj2html.mjs";
import { generateGraphMarks } from "./graphMarks.mjs";

const prefs = {
  data: {
    strokeWidth: 5,
    fill: "none",
    stroke: "rgb(69, 117, 180)",
  },
  marks: {
    stroke: "black",
    strokeDasharray: "0, 12",
    pointerEvents: "visible",
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
};

// 4 is the default
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-miterlimit
const strokeMiterlimit = 4;

const chart = ({ width, height, max, data }) => {
  const strokeWidth = prefs.data.strokeWidth;
  const padding = {
    // left: strokeWidth / 2,
    // right: strokeWidth / 2,
    // top: (strokeWidth / 2) * strokeMiterlimit,
    // bottom: (strokeWidth / 2) * strokeMiterlimit,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

  //   box({ width, height, style: { fill: "rgb(200,200,200)" } }),

  const xSteps = (width - padding.left - padding.right) / (data.length - 1);
  const yScaler = (height - padding.top - padding.bottom) / max;
  return {
    tag: "polyline",
    attr: {
      points: data
        .map(
          (item, index) =>
            `${index * xSteps + padding.left},${
              height - padding.bottom - item * yScaler
            }`,
        )
        .join(" "),
      style: prefs.data,
    },
  };
};

const box = ({ width, height, style }) => {
  return {
    tag: "rect",
    attr: {
      width,
      height,
      //   style,
      style: { fill: "rgb(255,255,255)" },
    },
  };
};

const svg = ({
  width,
  height,
  data,
  title,
  source,
  valueMarks,
  valueFormatter,
  chartsPadding,
  labels,
  labelFormatter,
}) => {
  const maxData = Math.max(...data.map((item) => Math.max(...item)));
  let marks = null;

  if (valueMarks && Array.isArray(valueMarks)) {
    marks = valueMarks.sort();
  } else if (valueMarks && typeof valueMarks === "object") {
    marks = generateGraphMarks([0, maxData]);
    if (valueMarks.add) {
      marks = [...marks, ...valueMarks.add].sort();
    }
  } else {
    marks = generateGraphMarks([0, maxData]);
  }

  //  valueMarks ? valueMarks.sort() : generateGraphMarks([0, data]);
  const max = Math.max(maxData, ...marks);

  const marksWidth = width - chartsPadding.left - chartsPadding.right;
  const marksHeight = height - chartsPadding.top - chartsPadding.bottom;

  const marksOffset = {
    x: -10,
    y: 7,
  };

  // data-axis
  const texts = {
    tag: "g",
    attr: {
      style: {
        textAnchor: "end",
        // fontFamily: "monospace",
      },
    },
    children: marks.map((item, index) => {
      let value = null;

      if (valueFormatter) {
        value = valueFormatter(item, index);
      } else {
        value = item;
      }

      return [
        {
          tag: "line",
          attr: {
            x1: chartsPadding.left,
            x2: chartsPadding.left + marksWidth,
            y1: height - chartsPadding.bottom - (marksHeight / max) * item,
            y2: height - chartsPadding.bottom - (marksHeight / max) * item,
            style: prefs.marks,
          },
        },
        {
          tag: "text",
          attr: {
            x: chartsPadding.left + marksOffset.x,
            y:
              height -
              chartsPadding.bottom -
              (marksHeight / max) * item +
              marksOffset.y,
          },
          children: [value],
        },
      ];
    }),
  };

  const chartWidth = width - chartsPadding.left - chartsPadding.right;
  const chartHeight = height - chartsPadding.top - chartsPadding.bottom;

  const charts = {
    tag: "g",
    attr: {
      transform: `translate(${chartsPadding.left} ${chartsPadding.top})`,
    },
    children: [
      box({
        width: chartWidth,
        height: chartHeight,
        style: { fill: "rgba(200,0,0,0.2)" },
      }),
      // render lines
      ...data.map((item) =>
        chart({
          width: chartWidth,
          height: chartHeight,
          max,
          data: item,
        }),
      ),
    ],
  };

  return {
    tag: "svg",
    attr: {
      viewBox: `0 0 ${width} ${height}`,
      xmlns: "http://www.w3.org/2000/svg",
    },
    children: [
      box({ width, height, style: { fill: "rgb(200,200,200)" } }),

      charts,
      texts,

      {
        tag: "text",
        attr: {
          class: "em",
          x: chartsPadding.left,
          y: 30,
        },
        children: [title],
      },
      {
        tag: "text",
        attr: {
          class: "source",
          x: chartsPadding.left,
          y: height - chartsPadding.bottom + 80,
        },
        children: [source],
      },

      {
        tag: "g",
        attr: {
          style: {
            textAnchor: "middle",
            // fontFamily: "monospace",
          },
        },
        children: [
          ...labels.map((item, index) => {
            let label = null;

            if (labelFormatter) {
              label = labelFormatter(item, index);
              // label formatter can be an array: [first, mid, last]
              // if (Array.isArray(labelFormatter)) {
              //   if (index === 0) {
              //     currentLabelFormatter = labelFormatter[0];
              //   } else if (index === labels.length - 1) {
              //     currentLabelFormatter =
              //       labelFormatter[2] || labelFormatter[1] || labelFormatter[0];
              //   } else {
              //     currentLabelFormatter =
              //       labelFormatter[1] || labelFormatter[0];
              //   }
              // } else {
              //   currentLabelFormatter = labelFormatter;
              // }
            } else {
              label = item;
            }

            return [
              {
                tag: "text",
                attr: {
                  x:
                    chartsPadding.left +
                    (chartWidth / (labels.length - 1)) * index,
                  y: height - chartsPadding.bottom + 30,

                  // "text-anchor":
                  //   index === 0
                  //     ? "start"
                  //     : index === labels.length - 1
                  //     ? "end"
                  //     : "",
                },
                children: [label],
              },
            ];
          }),
        ],
      },
    ],
  };
};

const Tafeln = (data) => {
  const defaults = {
    width: 600,
    height: 475,
    title: "",
    source: "",
    data: [],
    // valueMarks: [0, 100],
    valueFormatter: (value) => `${value}`,
    labels: [],
    chartsPadding: {
      left: 80,
      right: 20,
      top: 100,
      bottom: 50,
    },
  };

  return obj2html(svg({ ...defaults, ...data }), { pretty: true });
};

export default Tafeln;
