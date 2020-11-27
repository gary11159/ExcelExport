import React, { Fragment } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import Print from './print';
import SweetAlert from 'sweetalert2-react';
import ErrorSound from '../public/error.mp3';

function C_mode() {
    const [curData, setCurData] = React.useState('Box');
    const [bigData, setBigData] = React.useState([]);  // 最後得大資料
    const [smData, setSmData] = React.useState();    // 每一箱號的資料(暫存)
    const [msg, setMsg] = React.useState(); // 視窗訊息
    const [windowType, setWindowType] = React.useState('info');  // 視窗類型
    const [show, setShow] = React.useState(false);
    const [num, setNum] = React.useState(1);  // 幾頁分頁
    const [boxNumber, setBoxNumber] = React.useState();
    const inputBox = React.useRef();

    function handlerInput(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            validation();
            inputBox.current.focus();
        }
    }

    React.useEffect(() => {
    }, [])

    function playAudio() {
        let x = document.getElementById("myAudio");
        x.play()
    }

    // 儲存編號到箱號陣列
    function saveData() {
        if (smData !== undefined) {
            setSmData(pre => [...pre, { '箱號': boxNumber }]);
        } else {
            setSmData([{ '箱號': boxNumber }]);
        }

    }

    // 驗證掃描資料
    function validation() {
        // 做驗證
        if (boxNumber.length !== 11) {
            playAudio();
            setMsg(pre => '箱號資料出問題！');
            setWindowType(pre => 'error');
            setShow(true); // 跳出alert
            inputBox.current.focus();
        } else {
            saveData();
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
            setMsg(pre => '請新增資料！');
            setWindowType(pre => 'error');
            setShow(true); // 跳出alert
        }
        else {
            setBigData([...bigData, { [num]: smData }]);
            setNum(num => num + 1);
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
        inputBox.current.focus();
    }

    // 輸出完檔案
    function afterExport() {
        setBigData(pre => []);
        cleanAllInput();
    }

    return (
        <Fragment>
            <audio id="myAudio">
                <source src={ErrorSound} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <Container>
                <Row>
                    <Col sm={4} >
                        <InputGroup className="mb-3" size="lg">
                            <InputGroup.Prepend>
                                <InputGroup.Text>箱號</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={boxNumber} onChange={(e) => setBoxNumber(e.target.value)} ref={inputBox}
                                onFocus={(e) => handleFocus(e, 'Box')} aria-describedby="basic-addon1" onKeyPress={handlerInput} placeholder="請輸入箱號" maxlength="20" />
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
                            from="C"
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

export default C_mode