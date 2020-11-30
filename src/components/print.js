import React from "react";
import ReactExport from 'react-data-export';
import { Button } from 'react-bootstrap';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function Print(props) {
    return (
        <>
            <ExcelFile 
                element={<Button variant="warning" size="lg" disabled={!props.show} onClick={() => props.afterExport()} style={!props.show ? { cursor: 'not-allowed' } : null}>輸出Excel</Button>}
                filename={props.from === 'A' ? "A模式" : props.from === 'B' ? "B模式" : "C模式"}
            >
                {props.bigData.map((item, index) => {
                    return (
                        <ExcelSheet dataSet={[item]} name={(index + 1).toString()} key={index} />
                    )
                })}
            </ExcelFile>
        </>
    );
}

export default Print