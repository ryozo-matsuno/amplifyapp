import React, { useRef }  from "react";
import { Link } from 'react-router-dom';//　追加　Linkタブを読み込む
import { useBIContext } from './BIContext';
import DispBI from "./DispBI";

const GetISBN = () => {
  // ref が参照できるように、textInput をここで宣言する必要があります。
  const textInput = useRef(null);
  const resultSearch = useRef(null);
  const { biRecord, setBI } = useBIContext();

  function setBIRecord(result) {

    const bookInfoRecord = {isbn:"",Title:"",Author:"",CatalogPrice:"",Label:"",PublicationDate:"",Publisher:"",PurchaseDate:"",PurchaseLocation:"",RealPrice:"",Series:""};

    if (result.Items.length === 0) {
      resultSearch.current.innerText = "検索できないISBNが指定されています。";
      console.log("item is zero.");
    } else {

      bookInfoRecord["isbn"] = result.Items[0].Item.isbn;
      bookInfoRecord["Author"] = result.Items[0].Item.author;
      bookInfoRecord["CatalogPrice"] = result.Items[0].Item.itemPrice;
      bookInfoRecord["Label"] = result.Items[0].Item.seriesName;
      bookInfoRecord["PublicationDate"] = result.Items[0].Item.salesDate;
      bookInfoRecord["Publisher"] = result.Items[0].Item.publisherName;
      bookInfoRecord["PurchaseDate"] = "";
      bookInfoRecord["PurchaseLocation"] = "";
      bookInfoRecord["RealPrice"] = "0";
      bookInfoRecord["Series"] = "";
      bookInfoRecord["Title"] = result.Items[0].Item.title;

      setBI({...bookInfoRecord});

    }

}

  
  function handleClick() {

    resultSearch.current.innerText = "";

    var myHeaders = new Headers();

    var url = "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&outOfStockFlag=1&applicationId=1057945600246413213&isbn=" + textInput.current.value;

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => setBIRecord(result))
    .catch(error => console.log('error', error));

  }

  return (
    <div>
      <h2>新規図書追加</h2>
      <div>
        <input
          type="text"
          placeholder="ISBNを入力してください"
          ref={textInput} />
        <input
          type="button"
          value="Find"
          onClick={handleClick}
        />
      </div>
      <div>
        <label ref = {resultSearch}></label>
      </div>

      <div>
        <DispBI/>
      </div>
    </div>
  );
}

export default GetISBN;