import { Cell, Pie, PieChart, Sector, SectorProps, Tooltip } from 'recharts';
import { TooltipIndex } from 'recharts/types/state/tooltipSlice';

type Coordinate = {
    x: number;
    y: number;
};

type PieSectorData = {
    percent?: number;
    name?: string | number;
    midAngle?: number;
    middleRadius?: number;
    tooltipPosition?: Coordinate;
    value?: number;
    paddingAngle?: number;
    dataKey?: string;
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData;

// #region Sample data
const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

// #endregion
const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    value,
    name: sectorName
}: PieSectorDataItem) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle ?? 1));
    const cos = Math.cos(-RADIAN * (midAngle ?? 1));
    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={15} textAnchor="middle" fill={fill} fontSize={12}>
                {sectorName}({`${((percent ?? 1) * 100).toFixed(2)}%`})
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={(outerRadius ?? 0) + 6}
                outerRadius={(outerRadius ?? 0) + 10}
                fill={fill}
            />
            {/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" /> */}
            {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
            {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{sectorName?.split(" ", 1)}</text> */}
            {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`${((percent ?? 1) * 100).toFixed(2)}%`}
            </text> */}
        </g>
    );
};

const COLORS = ["#8884d8", "#82ca9d", "#ff7300", "#00C49F", "#FFBB28", "#FF8042"];

export default function SectorDistributionPieChart({
    isAnimationActive = true,
    defaultIndex = undefined,
    chartData = data
}: {
    isAnimationActive?: boolean;
    defaultIndex?: TooltipIndex;
    chartData?: { name: string, value: number }[]
}) {
    return (
        <PieChart
            style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
            responsive
            margin={{
                top: 50,
                right: 50,
                bottom: 50,
                left: 50,
            }}
        >
            <Pie
                activeShape={renderActiveShape}
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                dataKey="value"
                isAnimationActive={isAnimationActive}
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip content={() => null} defaultIndex={defaultIndex} />
        </PieChart>
    );
}
