# Tafeln

Tafeln is a lightweight JavaScript package for generating SVG line charts from your data. It transforms your datasets into clean and customizable SVG charts, perfect for embedding in web pages or applications.

## Usage/Installation

No NPM package available yet. You can use the package by adding it as a submodule to your project.

```sh
mkdir packages
git submodule add git@github.com:signalwerk/tafeln.git "./packages/tafeln"
```

## Parameters

The `Tafeln` function accepts an object with the following properties:

### `width` (Number)

- **Description**: The width of the SVG chart
- **Default**: `600`

### `height` (Number)

- **Description**: The height of the SVG chart
- **Default**: `475`

### `title` (String)

- **Description**: The title displayed at the top of the chart.
- **Default**: `""` (empty string)

### `source` (String)

- **Description**: The source or attribution text displayed at the bottom of the chart.
- **Default**: `""` (empty string)

### `data` (Array of Arrays)

- **Description**: An array containing one or more datasets. Each dataset is an array of numerical values representing a series in the chart.
- **Required**

### `labels` (Array)

- **Description**: An array of labels for the x-axis. The number of labels should correspond to the number of data points in each dataset.
- **Default**: `[]` (empty array)

### `valueMarks` (Array or Object)

- **Description**: Defines the y-axis marks (horizontal grid lines) on the chart.
  - If an **array**, it specifies the exact values at which to place the marks.
  - If an **object** with an `add` property (an array), it appends these values to the automatically generated marks.
  - If **undefined**, default marks are generated based on the data range.
- **Default**: Automatically generated marks based on data.

### `valueFormatter` (Function)

- **Description**: A function to format the y-axis mark labels.
- **Signature**: `(value, index) => formattedValue`
- **Default**: `(value) => \`${value}\``

### `labelFormatter` (Function)

- **Description**: A function to format the x-axis labels.
- **Signature**: `(label, index) => formattedLabel`
- **Default**: `(label) => label`

### `chartsPadding` (Object)

- **Description**: An object specifying the padding around the chart area.
- **Properties**:
  - `left` (Number): Left padding in pixels.
  - `right` (Number): Right padding in pixels.
  - `top` (Number): Top padding in pixels.
  - `bottom` (Number): Bottom padding in pixels.
- **Default**:
  ```javascript
  {
    left: 80,
    right: 20,
    top: 100,
    bottom: 50,
  }
  ```

## Example

Here's how to use Tafeln to create a simple SVG line chart:

```javascript
import Tafeln from "tafeln";

const chartData = {
  width: 800,
  height: 600,
  title: "Monthly Sales Data",
  source: "Company XYZ",
  data: [
    [150, 200, 250, 300, 350, 400], // Dataset 1
    [100, 150, 200, 250, 300, 350], // Dataset 2
  ],
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  valueMarks: [0, 100, 200, 300, 400],
  valueFormatter: (value) => `$${value}`,
  labelFormatter: (label) => label.toUpperCase(),
  chartsPadding: {
    left: 100,
    right: 50,
    top: 80,
    bottom: 60,
  },
};

const svgChart = Tafeln(chartData);

// You can now insert `svgChart` into your HTML page
document.getElementById("chart-container").innerHTML = svgChart;
```

This example generates an SVG chart with two datasets, custom axis labels, and formatted y-axis values representing monetary amounts.

---

Feel free to customize the parameters to suit your specific needs and create engaging charts with Tafeln!
