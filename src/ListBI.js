import React from 'react';              //Reactを読み込んでいる
import { Link } from 'react-router-dom';//　追加　Linkタブを読み込む
import DispListBI from './DispListBI';
import { ListBIProvider } from './ListBIContext';

const ListBI = () => {
  return (
    <div>
      <ListBIProvider>
        <DispListBI/>
      </ListBIProvider>
    </div>
  );
}

export default ListBI;