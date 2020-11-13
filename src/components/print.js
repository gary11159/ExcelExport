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
    console.log(props.bigData, dataSet1)
    return (
        <ExcelFile element={<Button variant="warning" size="lg">輸出Excel</Button>}>
            {props.bigData !== undefined && Object.entries(props.bigData).map(([key, value]) => {
                return (
                    // <ExcelSheet data={value} name={key} key={key}>
                    //     <ExcelColumn label="A" value="A" />
                    //     <ExcelColumn label="B" value="B" />
                    // </ExcelSheet>
                    <ExcelSheet data={dataSet1} name="123">
                        <ExcelColumn label="A" value="A" />
                        <ExcelColumn label="B" value="B" />
                    </ExcelSheet>
                )
            })}
            {/* <ExcelSheet data={dataSet1} name="123">
                <ExcelColumn label="A" value="A" />
                <ExcelColumn label="B" value="B" />
            </ExcelSheet> */}
        </ExcelFile>
    );
}

export default Print