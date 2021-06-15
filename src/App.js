import axios from 'axios';
import './App.css';

function App() {
  const auth = () => {
    const checkout = new window.PagarMeCheckout.Checkout({
      encryption_key: process.env.REACT_APP_ENC_KEY,
      success: console.log,
      error: console.error,
      close: () => console.log('closed')
    });

    checkout.open({
      amount: 100,
      createToken: 'true',
      paymentMethods: 'credit_card',
      customerData: 'true',
      postbackUrl: 'https://dev.api.ecommerce.a2s.technology/users',
      items: [
        {
          id: '1',
          title: 'Curso de Programação',
          unit_price: 100,
          quantity: 1,
          tangible: 'false'
        }]
    })
  };

  const capture = () => {
    axios.post('https://api.pagar.me/1/transactions/test_transaction_3i4XgUze4GnG9pmSRbEtJiVubdjU7n/capture', {
      amount: 100, api_key: process.env.REACT_APP_API_KEY, "split_rules": [
        {
          "recipient_id": "re_ckpply5r6046s0h9t56w4a1my",
          "percentage": 50,
          "liable": true,
          "charge_processing_fee": true
        }, {
          "recipient_id": "re_ckpplzdsx047z0h9t1vbzupji",
          "percentage": 50,
          "liable": true,
          "charge_processing_fee": true
        }
      ]
    }).then(console.log)
  }
  //recipient1 re_ckpply5r6046s0h9t56w4a1my
  //recipient2 re_ckpplzdsx047z0h9t1vbzupji
  const createRecipient = () => {
    axios.post('https://api.pagar.me/1/recipients', {
      amount: 100, api_key: process.env.REACT_APP_API_KEY,
      "automatic_anticipation_enabled": "true",
      "bank_account": {
        "bank_code": "342",
        "agencia": "0932",
        "agencia_dv": "5",
        "conta": "58054",
        "type": "conta_corrente",
        "conta_dv": "1",
        "document_number": "26268738888",
        "legal_name": "API BANK ACCOUNT"
      },
      "transfer_day": "5",
      "transfer_enabled": "true",
      "transfer_interval": "weekly",
      "postback_url": "https://dev.api.ecommerce.a2s.technology/users"
    }).then(console.log)
  }

  return (
    <div className="App">
      <button onClick={auth}>auth</button>
      <button onClick={capture}>capture</button>
      <button onClick={createRecipient}>createRecipient</button>
    </div>
  );
}

export default App;
