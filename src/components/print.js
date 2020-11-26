import React from "react";
import ReactExport from "react-export-excel";
import { Button } from 'react-bootstrap';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        A: '123',
        B: '321'
    },
    {
        A: '123',
        B: '321'
    }, {
        A: '123',
        B: '321'
    }, {
        A: '123',
        B: '321'
    }, {
        A: '123',
        B: '321'
    },
];


function Print(props) {
    return (
        <ExcelFile element={<Button variant="warning" size="lg" disabled={!props.show} onClick={() => props.afterExport()} style={!props.show ? {cursor: 'not-allowed'} : null}>輸出Excel</Button>}>
            {props.bigData !== undefined && props.bigData.map((item) => {
                return (
                    <ExcelSheet data={Object.values(item)[0]} name={Object.keys(item)} key={Object.keys(item)}>
                        <ExcelColumn label="A" value="A" />
                        <ExcelColumn label="B" value="B" />
                    </ExcelSheet>
                )
            })}
        </ExcelFile>
    );
}

export default Print