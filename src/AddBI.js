import React from "react";
import GetISBN from './GetISBN';
import { BIProvider } from './BIContext';

const AddBI = () => {
  return (
    <div>
      <BIProvider>
        <GetISBN/>
      </BIProvider>
    </div>
  );
}

export default AddBI;