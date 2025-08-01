import CadastroPessoal from './CadastroPessoal';
import { Logotipo } from '../../components';
import CadastroEndereco from './CadastroEndereco';
import { useState } from 'react';

export default function Cadastro() {
  const [showEndereco, setShowEndereco] = useState(false);
  return (
    <>
      <Logotipo />
      {!showEndereco && <CadastroPessoal setShowEndereco={setShowEndereco} />}
      {showEndereco && <CadastroEndereco setShowEndereco={setShowEndereco} />}
    </>
  );
}
