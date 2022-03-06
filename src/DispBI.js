import React, { useRef, useState }  from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

import { useBIContext } from './BIContext';

const DispBI = () => {

  const labelInput = useRef(null);
  const purchaseLocationInput = useRef(null);
  const realPriceInput = useRef(null);
  const seriesInput = useRef(null);
  const resultRequest = useRef(null);

  const { biRecord, setBI } = useBIContext();

  const initialDate = new Date();
  const [startDate, setStartDate] = useState(initialDate);

  const handleChangeDate = (date) => {
    setStartDate(date);
  }

  function successRequest(result) {

    resultRequest.current.innerText = biRecord.isbn + ' は登録されました。';

  }

  function handleClick() {

    const padStartDate = startDate.getFullYear() + "/" + (startDate.getMonth() + 1).toString().padStart(2,'0') + "/" + startDate.getDate().toString().padStart(2,'0');

    console.log(padStartDate);

    const bookInfoRecord = {isbn:"",Title:"",Author:"",CatalogPrice:"",Label:"",PublicationDate:"",Publisher:"",PurchaseDate:"",PurchaseLocation:"",RealPrice:"",Series:""};

    bookInfoRecord["isbn"] = biRecord.isbn;
    bookInfoRecord["Author"] = biRecord.Author;
    bookInfoRecord["CatalogPrice"] = biRecord.CatalogPrice;
    bookInfoRecord["Label"] = labelInput.current.value;
    bookInfoRecord["PublicationDate"] = biRecord.PublicationDate;
    bookInfoRecord["Publisher"] = biRecord.Publisher;
    bookInfoRecord["PurchaseDate"] = padStartDate;
    bookInfoRecord["PurchaseLocation"] = purchaseLocationInput.current.value;
    bookInfoRecord["RealPrice"] = realPriceInput.current.value;
    bookInfoRecord["Series"] = seriesInput.current.value;
    bookInfoRecord["Title"] = biRecord.Title;

    console.log(bookInfoRecord);

    setBI({...bookInfoRecord});

    console.log(biRecord);

    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var url = "https://wnmoswedd9.execute-api.us-west-2.amazonaws.com/demo/item/";
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(bookInfoRecord)
    };

    // make API call with parameters and use promises to get response
    fetch(url, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK')
        }
        return response.json();
    })
    .then(result => successRequest(result))
    .catch(error => console.log('error', error));


  }

  return (
    <div>
        <div>
            <label>ISBN　　　：　</label>
            <input type="text" name="Title" defaultValue={biRecord.isbn} size="50" disabled />
        </div>
        <div>
            <label>タイトル　：　</label>
            <input type="text" name="Title" defaultValue={biRecord.Title} size="50" disabled />
        </div>
        <div>
            <label>著者　　　：　</label>
            <input type="text" name="Author" defaultValue={biRecord.Author} size="50" disabled />
        </div>
        <div>
            <label>ラベル　　：　</label>
            <input type="text" name="Label" ref={labelInput} defaultValue={biRecord.Label} size="50" />
        </div>
        <div>
            <label>定価　　　：　</label>
            <input type="text" name="CatalogPrice" defaultValue={biRecord.CatalogPrice} size="50" disabled />
        </div>
        <div>
            <label>出版社　　：　</label>
            <input type="text" name="Publisher" defaultValue={biRecord.Publisher} size="50" disabled />
        </div>
        <div>
            <label>出版日　　：　</label>
            <input type="text" name="PublicationDate" defaultValue={biRecord.PublicationDate} size="50" disabled />
        </div>
        <div>
            <label>購入日　　：　
                <DatePicker dateFormat="yyyy/MM/dd" selected={startDate} onChange={handleChangeDate} />
            </label>
        </div>
        <div>
            <label>購入店　　：　</label>
            <input type="text" name="PurchaseLocation" ref={purchaseLocationInput} defaultValue={""} size="50" />
        </div>
        <div>
            <label>購入価格　：　</label>
            <input type="text" name="RealPrice" ref={realPriceInput} defaultValue={""} size="50" />
        </div>
        <div>
            <label>シリーズ　：　</label>
            <input type="text" name="Series" ref={seriesInput} defaultValue={""} size="50" />
        </div>

        <input
          type="button"
          value="Set"
          onClick={handleClick}
        />
        <div>
            <label ref={resultRequest}></label>
        </div>



    </div>

  )
}

export default DispBI;