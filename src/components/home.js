import React, { Fragment } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import Print from './print';
import SweetAlert from 'sweetalert2-react';
import Modal from 'react-bootstrap/Modal';
import ErrorSound from '../public/error.mp3';

function Home() {
    const [curData, setCurData] = React.useState('Box');
    const [bigData, setBigData] = React.useState([]);  // 最後得大資料
    const [smData, setSmData] = React.useState();    // 每一箱號的資料(暫存)
    const [msg, setMsg] = React.useState(); // 視窗訊息
    const [windowType, setWindowType] = React.useState('info');  // 視窗類型
    const [show, setShow] = React.useState(false);
    const [boxNumber, setBoxNumber] = React.useState();
    const [dataA, setDataA] = React.useState();
    const [dataB, setDataB] = React.useState();
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
    }, [])

    function playAudio() {
        let x = document.getElementById("myAudio");
        x.play()
    }

    // 儲存編號到箱號陣列
    function saveData() {
        if (smData !== undefined) {
            setSmData(pre => [...pre, { 'A': dataA, 'B': dataB }]);
        } else {
            setSmData([{ 'A': dataA, 'B': dataB }]);
        }

    }

    // 驗證掃描資料
    async function validation() {
        // 做驗證
        if (curData === 'A') {
            if (dataA.length === 13) {
                inputB.current.focus();
            } else {
                playAudio();
                setMsg(pre => 'A資料出問題！');
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
                setMsg(pre => 'B資料出問題！');
                setWindowType(pre => 'error');
                setShow(true); // 跳出alert
                inputB.current.focus();
            }
        } else if (curData === 'Box') {
            if (boxNumber.length === 11) {
                inputA.current.focus();
            } else {
                playAudio();
                setMsg(pre => '箱號資料出問題！');
                setWindowType(pre => 'error');
                setShow(true); // 跳出alert
                inputBox.current.focus();
            }
        }
        // 回傳
        return false;
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
            setBigData([...bigData, { [boxNumber]: smData }]);
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
                                onFocus={(e) => handleFocus(e, 'Box')} aria-describedby="basic-addon1" onKeyPress={handlerInput} placeholder="請輸入箱號" maxlength="11"/>
                        </InputGroup>

                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <InputGroup className="mb-3" size="lg">
                            <InputGroup.Prepend>
                                <InputGroup.Text>輸入資料</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={dataA} onChange={(e) => setDataA(e.target.value)} ref={inputA} onFocus={(e) => handleFocus(e, 'A')} placeholder="請掃描A資料" onKeyPress={handlerInput} maxlength="13" />
                            <FormControl value={dataB} onChange={(e) => setDataB(e.target.value)} ref={inputB} onFocus={(e) => handleFocus(e, 'B')} placeholder="請掃描B資料" onKeyPress={handlerInput} maxlength="10" />
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

export default Home