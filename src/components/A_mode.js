import React, { Fragment } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import Print from './print';
import SweetAlert from 'sweetalert2-react';

function A_mode(props) {
    const [curData, setCurData] = React.useState('Box');
    const [bigData, setBigData] = React.useState([]);  // 最後得大資料
    const [smData, setSmData] = React.useState();    // 每一箱號的資料(暫存)
    const [msg, setMsg] = React.useState(); // 視窗訊息
    const [windowType, setWindowType] = React.useState('info');  // 視窗類型
    const [show, setShow] = React.useState(false);
    const [boxNumber, setBoxNumber] = React.useState("");
    const [dataA, setDataA] = React.useState("");
    const [dataB, setDataB] = React.useState("");
    const inputBox = React.useRef();
    const inputA = React.useRef();
    const inputB = React.useRef();

    function handlerInput(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            validation();
        }
    }

    React.useEffect(() => {
        if ( props.curTab === 'a_mode' ) {
            if ( curData === 'Box' ) 
                inputBox.current.focus();
            else if ( curData === 'A' ) 
                inputA.current.focus();
            else if ( curData === 'B' ) 
                inputB.current.focus();
        }
    }, [props.curTab]);

    function playAudio() {
        let x = document.getElementById("myAudio");
        x.play()
    }

    // 儲存編號到箱號陣列
    function saveData() {
        if (smData !== undefined) {
            setSmData(pre => [...pre, [{ value: boxNumber }, { value: dataA }, { value: dataB }]]);
        } else {
            setSmData([[{ value: boxNumber }, { value: dataA }, { value: dataB }]]);
        }

    }

    // 驗證掃描資料
    function validation() {
        // 做驗證
        if (curData === 'A') {
            if (dataA.length === 13) {
                inputB.current.focus();
            } else {
                playAudio();
                setMsg(pre => '一維條碼格式有問題！');
                setWindowType(pre => 'error');
                setShow(true); // 跳出alert
                inputA.current.focus();
            }
        } else if (curData === 'B') {
            if (dataB.length === 10) {
                saveData();
                inputA.current.focus();
            } else {
                playAudio();
                setMsg(pre => 'QR CODE格式有問題！');
                setWindowType(pre => 'error');
                setShow(true); // 跳出alert
                inputB.current.focus();
            }
        } else if (curData === 'Box') {
            if (boxNumber.length === 11) {
                inputA.current.focus();
            } else {
                playAudio();
                setMsg(pre => '外箱條碼格式有問題！');
                setWindowType(pre => 'error');
                setShow(true); // 跳出alert
                inputBox.current.focus();
            }
        }
    }

    // 點擊input全選
    function handleFocus(event, type) {
        setCurData(pre => type);
        event.target.select();
    }

    // 儲存到最終資料
    function saveBigData() {
        if (boxNumber === undefined || boxNumber === '' || boxNumber === null) {
            setMsg(pre => '請輸入箱號！');
            setWindowType(pre => 'error');
            setShow(true); // 跳出alert
        } else if (smData === undefined || smData === '') {
            setMsg(pre => '請先新增資料！');
            setWindowType(pre => 'error');
            setShow(true); // 跳出alert
        }
        else {
            setBigData([...bigData, { 
                columns: [
                    { title: "箱號", width: {wpx: 100}},
                    { title: "一維條碼", width: {wpx: 120} }, // width in pixels
                    { title: "條碼(QR CODE)", width: {wpx: 120} }, // width in pixels
                  ],
                  data: smData
                  ,
            }]);

            cleanAllInput();
            setMsg(pre => '新增箱號成功！');
            setWindowType(pre => 'success');
            setShow(true); // 跳出alert
        }

    }

    // 清空所有輸入
    function cleanAllInput() {
        setBoxNumber('');
        setSmData();
        setDataA('');
        setDataB('');
        inputBox.current.focus();
    }

    // 輸出完檔案
    function afterExport() {
        setBigData(pre => []);
        cleanAllInput();
    }

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col sm={4} >
                        <InputGroup className="mb-3" size="lg">
                            <InputGroup.Prepend>
                                <InputGroup.Text>外箱</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={boxNumber} onChange={(e) => setBoxNumber(e.target.value)} ref={inputBox}
                                onFocus={(e) => handleFocus(e, 'Box')} aria-describedby="basic-addon1" onKeyPress={handlerInput} placeholder="請掃描外箱條碼" maxLength="20" />
                        </InputGroup>

                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <InputGroup className="mb-3" size="lg">
                            <InputGroup.Prepend>
                                <InputGroup.Text>掃描資料</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={dataA} onChange={(e) => setDataA(e.target.value)} ref={inputA} onFocus={(e) => handleFocus(e, 'A')} placeholder="請掃描一維條碼" onKeyPress={handlerInput} maxLength="20" />
                            <FormControl value={dataB} onChange={(e) => setDataB(e.target.value.toLocaleLowerCase().replaceAll('http://sunon.bz/?', ''))} ref={inputB} onFocus={(e) => handleFocus(e, 'B')} placeholder="請掃描QR Code" onKeyPress={handlerInput} maxLength="20" />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8} style={{ marginBottom: '16px' }}>
                        當前箱號有{smData !== undefined ? smData.length : 0}筆資料，{bigData !== undefined ? bigData.length : 0}筆箱號
                </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <Button variant="info" size="lg" onClick={() => saveBigData()}>儲存當前箱號</Button>
                        {' '}
                        <Print
                            from="A"
                            bigData={bigData}
                            show={bigData.length > 0 ? true : false}
                            afterExport={() => afterExport()} />
                    </Col>
                </Row>
            </Container>
            <SweetAlert
                show={show}
                title="訊息"
                type={windowType}
                text={msg}
                onConfirm={() => setShow(false)}
            />
        </Fragment>
    );
}

export default A_mode