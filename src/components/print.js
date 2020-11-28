import React from "react";
import ReactExport from "react-export-excel";
import { Button } from 'react-bootstrap';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function Print(props) {
    return (
        <>
            {props.from !== 'C' ?
                <ExcelFile filename={props.from === 'A' ? "A模式" : "B模式"} element={<Button variant="warning" size="lg" disabled={!props.show} onClick={() => props.afterExport()} style={!props.show ? { cursor: 'not-allowed' } : null}>輸出Excel</Button>}>
                    {props.bigData !== undefined && props.bigData.map((item) => {
                        return (
                            <ExcelSheet data={Object.values(item)[0]} name={Object.keys(item)} key={Object.keys(item)}>
                                <ExcelColumn label="一維條碼" value="一維條碼" />
                                <ExcelColumn label="條碼(QR CODE)" value="條碼(QR CODE)" />
                            </ExcelSheet>
                        )
                    })}
                </ExcelFile> :
                <ExcelFile filename="C模式" element={<Button variant="warning" size="lg" disabled={!props.show} onClick={() => props.afterExport()} style={!props.show ? { cursor: 'not-allowed' } : null}>輸出Excel</Button>}>
                    {props.bigData !== undefined && props.bigData.map((item) => {
                        return (
                            <ExcelSheet data={Object.values(item)[0]} name={Object.keys(item)} key={Object.keys(item)}>
                                <ExcelColumn label="外箱條碼" value="外箱條碼" />
                            </ExcelSheet>
                        )
                    })}
                </ExcelFile>
            }

        </>
    );
}

export default Print