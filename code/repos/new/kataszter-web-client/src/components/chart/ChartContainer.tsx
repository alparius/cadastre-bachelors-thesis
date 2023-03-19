import React, { useState } from "react";
import { FormattedMessage as FM, useIntl } from "react-intl";
import {
    Bar,
    BarChart,
    BarSeries,
    Line,
    LinearXAxis,
    LinearXAxisTickLabel,
    LinearXAxisTickSeries,
    LinearYAxis,
    LinearYAxisTickSeries,
    LineChart,
    LineSeries,
    PieArcSeries,
    PieChart
} from "reaviz";
import { Button, Form, Header, Modal } from "semantic-ui-react";

import IChartData from "../../data/ChartData";
import IPriestChartData from "../../data/priest/PriestChartData";
import { axisNameList, chartNameList, dataNameList, keyNameList } from "../../util/charts/chartDropdowns";
import { customColorSchemes } from "../../util/charts/customColorSchemes";
import BoldFM from "../../util/styledMessages/BoldFM";
import CardPlaceholder from "../CardPlaceholder";
import ErrorMsg from "../ErrorMsg";

interface IChartContainerProps {
    priests: IPriestChartData[] | undefined;
    loading: boolean;
    showError: boolean;
}

const ChartContainer: React.FC<IChartContainerProps> = (props: IChartContainerProps) => {
    const { priests, loading, showError } = props;
    const { formatMessage: fm } = useIntl();

    const [chartName, setChartName] = useState(chartNameList[0].value);
    const [xAxis, setXAxis] = useState(keyNameList[0].value);
    const [yAxis, setYAxis] = useState(dataNameList[0].value);
    const [sortedAxis, setSortedAxis] = useState(axisNameList[0].value);
    const [minGroupSize, setMinGroupSize] = useState(2);
    const [showEtc, setShowEtc] = useState(true);

    const handleChartNameChange = (_: any, { value }: any) => setChartName(value);
    const handleXAxisChange = (_: any, { value }: any) => setXAxis(value);
    const handleYAxisChange = (_: any, { value }: any) => setYAxis(value);
    const handleSortedAxisChange = (_: any, { value }: any) => setSortedAxis(value);
    const handleMinGroupSizeChange = (_: any, { value }: any) => setMinGroupSize(value);
    const handleShowEtcChange = (_: any) => setShowEtc((prev: boolean) => !prev);

    const [infoOpen, setInfoOpen] = useState(false);

    if (showError) {
        return <ErrorMsg errorMessage={"error.connection"} />;
    } else if (loading) {
        return <CardPlaceholder />;
    } else if (!priests || priests.length === 0) {
        return (
            <>
                <CardPlaceholder />
                <Header as="h2">
                    <FM id="search.noResult" />
                </Header>
            </>
        );
    } else {
        let chartData: IChartData[] = [];
        let chartDatum: IChartData;
        let usedDataSize: number = 0;

        priests.forEach((p: IPriestChartData) => {
            if (p[xAxis] !== undefined && p[xAxis] !== 0 && p[xAxis] !== "") {
                usedDataSize += 1;
                const match = chartData.filter((item: IChartData) => item.key === p[xAxis]);
                // new entry or incrementing an existing one
                if (match.length === 0) {
                    chartDatum = { key: p[xAxis], data: p[yAxis], counter: 1 };
                    chartData.push(chartDatum);
                } else {
                    match[0].data += p[yAxis];
                    match[0].counter += 1;
                }
            }
        });

        if (chartName !== "line") {
            // aggregating small categories on pie/bar
            const temp = chartData.filter((item: IChartData) => item.counter < minGroupSize);
            chartDatum = {
                key: fm({ id: "charts.etc" }),
                data: temp.reduce((prev: number, next: IChartData) => prev + (next.data || 0), 0),
                counter: temp.reduce((prev: number, next: IChartData) => prev + (next.counter || 0), 0)
            };
            // to include or not the aggregated small categories
            if (showEtc) {
                chartData.push(chartDatum);
            } else {
                usedDataSize -= chartDatum.counter;
            }
        }

        if (yAxis !== "nr") {
            // if not population size statistic, divide and round the aggregate with the counter
            chartData.forEach((item: IChartData) => (item.data = Math.round((item.data / item.counter) * 100) / 100));
        } else {
            // if population size statistic, then the data is the counter
            chartData.forEach((item: IChartData) => (item.data = item.counter));
        }

        // filter by the aggregate axis by group size on pie/bar
        if (chartName !== "line") {
            if (yAxis === "nr") {
                chartData = chartData.filter((item: IChartData) => item.data >= minGroupSize);
            } else {
                chartData = chartData.filter((item: IChartData) => item.counter >= minGroupSize);
            }
        }

        let colorScheme = customColorSchemes.SoulMind;
        // boolean main axis
        if (xAxis.startsWith("is")) {
            colorScheme = customColorSchemes.SoulMindBoolean;
            chartData.forEach((item: IChartData) => (item.key = item.key ? fm({ id: "general.yes" }) : fm({ id: "general.no" })));
        }

        // sort by the selected sorting axis
        if (chartName === "line") {
            chartData = chartData.sort((a: IChartData, b: IChartData) => a.key - b.key);
        } else if (sortedAxis === "x") {
            chartData = chartData.sort((a: IChartData, b: IChartData) => (b.key.toString() as string).localeCompare(a.key));
        } else {
            chartData = chartData.sort((a: IChartData, b: IChartData) => a.data - b.data);
        }

        return (
            <>
                <Modal open={infoOpen} onClose={() => setInfoOpen(false)}>
                    <Modal.Header>
                        <FM id="charts.infoTitle" />
                    </Modal.Header>
                    <Modal.Content>
                        <p>
                            <FM id="charts.infoContent1" />
                        </p>
                        <p>
                            <FM id="charts.infoContent2" />
                        </p>
                        <p>
                            <FM id="charts.infoContent3" />
                        </p>
                        <p>
                            <FM id="charts.infoContent4" />
                        </p>
                        <p>
                            <FM id="charts.infoContent5" />
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="purple" onClick={() => setInfoOpen(false)} content={fm({ id: "charts.back" })} />
                    </Modal.Actions>
                </Modal>

                <Form>
                    <Form.Group widths={3}>
                        <Form.Field>
                            <BoldFM id="charts.chartType" />
                            <Form.Dropdown
                                selection
                                placeholder="Chart type"
                                value={chartName}
                                onChange={handleChartNameChange}
                                options={chartNameList}
                            />
                        </Form.Field>

                        <Form.Field>
                            <BoldFM id="charts.axisX" />
                            <Form.Dropdown selection placeholder="Main axis" value={xAxis} onChange={handleXAxisChange} options={keyNameList} />
                        </Form.Field>

                        <Form.Field>
                            <BoldFM id="charts.axisY" />
                            <Form.Dropdown selection placeholder="Secondary axis" value={yAxis} onChange={handleYAxisChange} options={dataNameList} />
                        </Form.Field>

                        <Form.Field width={1}>
                            <Form.Button
                                icon="help"
                                secondary
                                color="violet"
                                circular
                                style={{ marginTop: "1.5em" }}
                                onClick={() => setInfoOpen(true)}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths={3}>
                        {chartName !== "line" && (
                            <>
                                <Form.Field>
                                    <BoldFM id="charts.sortBy" />
                                    <Form.Dropdown
                                        selection
                                        placeholder="Sorted axis"
                                        value={sortedAxis}
                                        onChange={handleSortedAxisChange}
                                        options={axisNameList}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <BoldFM id="charts.minGroupSize" />
                                    <Form.Input type="number" value={minGroupSize} onChange={handleMinGroupSizeChange} />
                                </Form.Field>

                                <Form.Field>
                                    <BoldFM id="charts.showEtc" />
                                    <Form.Checkbox toggle style={{ marginTop: "0.8em" }} checked={showEtc} onChange={handleShowEtcChange} />
                                </Form.Field>

                                <Form.Field width={1} />
                            </>
                        )}
                    </Form.Group>
                </Form>

                {chartData.length === 0 ? (
                    <Header as="h4">
                        <FM id="charts.noResult" />
                    </Header>
                ) : chartName === "line" && !xAxis.includes("Year") ? (
                    <Header as="h4">
                        <FM id="charts.badCombo" />
                    </Header>
                ) : (
                    <>
                        <p style={{ marginTop: "2em" }}>
                            {priests.length} <FM id="charts.sizeSearch" /> {usedDataSize} <FM id="charts.sizeUsed" />
                        </p>

                        <div style={{ height: "50%", width: "100%" }}>
                            {chartName === "line" ? (
                                <LineChart
                                    data={chartData}
                                    series={
                                        <LineSeries
                                            colorScheme={customColorSchemes.SoulMindViolet}
                                            animated
                                            interpolation="smooth"
                                            line={<Line strokeWidth={2} />}
                                        />
                                    }
                                    xAxis={
                                        <LinearXAxis
                                            type="duration"
                                            domain={[chartData[0].key, chartData[chartData.length - 1].key]}
                                            tickSeries={<LinearXAxisTickSeries label={<LinearXAxisTickLabel rotation={false} />} />}
                                        />
                                    }
                                    yAxis={<LinearYAxis type="duration" />}
                                />
                            ) : chartName === "pie" ? (
                                <PieChart data={chartData} series={<PieArcSeries explode={false} colorScheme={colorScheme} />} />
                            ) : (
                                chartName === "bar" && (
                                    <BarChart
                                        data={chartData}
                                        xAxis={<LinearXAxis type="value" />}
                                        yAxis={<LinearYAxis type="category" tickSeries={<LinearYAxisTickSeries tickSize={20} />} />}
                                        series={<BarSeries colorScheme={colorScheme} layout="horizontal" bar={<Bar rounded />} />}
                                    />
                                )
                            )}
                        </div>
                    </>
                )}
            </>
        );
    }
};

export default ChartContainer;
