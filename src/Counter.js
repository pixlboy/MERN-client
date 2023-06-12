import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

function Counter() {
  const history = useHistory();

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [cheese, setCheese] = useState(0);
  const [isSalad, setSalad] = useState(false);
  const [cutlets, setCutlets] = useState(0);

  useEffect(() => {
    const total = (1 * process.env.REACT_APP_BUN_AMOUNT) + 
                  (cheese * process.env.REACT_APP_CHEESE_AMOUNT) + 
                  (cutlets * process.env.REACT_APP_CUTLET_AMOUNT) + 
                  (isSalad * process.env.REACT_APP_SALAD_AMOUNT);
    setTotal(total);
  }, [cheese, isSalad, cutlets]);

  useEffect(() => {
    if (localStorage.getItem("items")) {
      setItems(JSON.parse(localStorage.getItem("items")));
    }
  }, []);

  const toggleSalad = () => {
    if (isSalad) {
      setSalad(!isSalad);
    } else {
      setSalad(!isSalad);
    }
  };

  const onCheckout = () => {
    if (name) {
      const itemDetail = {
        Bun: 1 * process.env.REACT_APP_BUN_AMOUNT,
        Cheese: cheese * process.env.REACT_APP_CHEESE_AMOUNT,
        Cutlets: cutlets * process.env.REACT_APP_CUTLET_AMOUNT,
        Salad: isSalad * process.env.REACT_APP_SALAD_AMOUNT,
        Total: total,
        Name: name,
      };
      const temp = items.concat([itemDetail]);
      setItems(temp);
      localStorage.setItem("items", JSON.stringify(temp));
      history.push("/summary");
    }
  };

  return (
    <div>
      <h1>Counter</h1>
      <Card className="mb-4 text-muted">
        <Card.Body>
          <Form.Group>
            <Row xs={1} sm={2} md={3}>
              <Col className="p-2">
                <Form.Label>Customer</Form.Label>
              </Col>
              <Col className="p-2">
                <Form.Control
                  type="text"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Row>
            <Row xs={1} sm={2} md={3}>
              <Col className="p-2">
                <Form.Label>Cheese Slices</Form.Label>
              </Col>
              <Col className="p-2 d-flex">
                <Form.Control
                  type="number"
                  min="0"
                  max="5"
                  defaultValue="0"
                  id="cheeseInput"
                  onChange={(e) => setCheese(e.target.value)}
                />
              </Col>
            </Row>
            <Row xs={1} sm={2} md={3}>
              <Col className="p-2">
                <Form.Label>Cutlets</Form.Label>
              </Col>
              <Col className="p-2 d-flex">
                <Form.Control
                  type="number"
                  min="0"
                  max="5"
                  defaultValue="0"
                  onChange={(e) => setCutlets(e.target.value)}
                />
              </Col>
            </Row>
            <Row xs={1} sm={2} md={3}>
              <Col className="p-2">
                <Form.Label>Salad</Form.Label>
              </Col>
              <Col className="p-2">
                <Form.Control
                  className="text-left"
                  type="checkbox"
                  selected
                  id="saladInput"
                  onChange={toggleSalad}
                />
              </Col>
            </Row>
            <Row xs={1} sm={2} md={3}>
              <Col className="p-2 d-flex">
                <Form.Label>Bun</Form.Label>
              </Col>
              <Col className="p-2">
                <span>10</span>
              </Col>
            </Row>
            <Row xs={1} sm={2} md={3}>
              <Col className="p-2">
                <strong>Total - {total}</strong>
              </Col>
            </Row>
            <div className="text-center">
              <Button disabled={!name} onClick={onCheckout}>Checkout</Button>
            </div>
          </Form.Group>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Counter;
