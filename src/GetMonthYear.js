import React, { useRef }  from "react";
import { Link } from 'react-router-dom';//　追加　Linkタブを読み込む
import AddBI from './AddBI';
import { useListBIContext } from './ListBIContext';

const GetMonthYear = () => {
  // ref が参照できるように、textInput をここで宣言する必要があります。
  const textInput = useRef(null);
  const resultSearch = useRef(null);
  const listBITable = useRef(null);
  const totalRealPriceRef = useRef(null);
  const totalCatalogPriceRef = useRef(null);

  function setBIRecords(result) {

    if (result.length === 0) {
      resultSearch.current.innerText = "この月は対象となる書籍がありません。";
      console.log("item is zero.");
    } else {

        const table = listBITable.current;

        let totalRealPrice = 0;
        let totalCatalogPrice = 0;

        for (let i = 0; i < result.length; i++) {

            const row = table.insertRow();
            row.insertCell().appendChild(document.createTextNode(result[i].isbn));
            row.insertCell().appendChild(document.createTextNode(result[i].Title));
            row.insertCell().appendChild(document.createTextNode(result[i].PurchaseDate));
            row.insertCell().appendChild(document.createTextNode(result[i].RealPrice));
            row.insertCell().appendChild(document.createTextNode(result[i].CatalogPrice));
            row.insertCell().appendChild(document.createTextNode(result[i].PurchaseLocation));
            row.insertCell().appendChild(document.createTextNode(result[i].Label));
            row.insertCell().appendChild(document.createTextNode(result[i].Series));
            row.insertCell().appendChild(document.createTextNode(result[i].Publisher));
            row.insertCell().appendChild(document.createTextNode(result[i].PublicationDate));
            row.insertCell().appendChild(document.createTextNode(result[i].Author));

            totalRealPrice += parseInt(result[i].RealPrice);
            totalCatalogPrice += parseInt(result[i].CatalogPrice);

        }

        totalRealPriceRef.current.innerText = totalRealPrice;
        totalCatalogPriceRef.current.innerText = totalCatalogPrice;

    }

}

  
  function handleClick() {

    const count = listBITable.current.rows.length;

    if (count > 1) {
        for (let i = 1; i < count; i++) {
            listBITable.current.deleteRow(1);
        }
    } 

    resultSearch.current.innerText = "";

    var myHeaders = new Headers();

    var url = "https://wnmoswedd9.execute-api.us-west-2.amazonaws.com/demo/scan";

    var targetMonth = new Object();
    targetMonth['month'] = textInput.current.value;

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(targetMonth)
    };

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => setBIRecords(result))
    .catch(error => console.log('error', error));

  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="対象の年月を入力してください。"
          ref={textInput} />
        <input
          type="button"
          value="Listup"
          onClick={handleClick}
        />
      </div>
      <div>
        <label ref = {resultSearch}></label>
      </div>

      <div>
            <table border="1">
                <thead>
                    <tr>
                        <th colSpan="11">Book Information List</th>
                    </tr>
                </thead>
                <tbody  ref = {listBITable} >
                    <tr><th>ISBN</th><th>タイトル</th><th>購入日</th><th>購入価格</th><th>定価</th><th>購入場所</th><th>レーベル</th><th>分類</th><th>出版社</th><th>出版日</th><th>著者</th></tr>
                </tbody>
            </table>
            <div><label>購入総額　：　</label><label ref = {totalRealPriceRef}></label></div>
            <div><label>定価総額　：　</label><label ref = {totalCatalogPriceRef}></label></div>
        <Link to={`/`}>Book Information 入力画面へ異動</Link>
      </div>
    </div>
  );
}

export default GetMonthYear;