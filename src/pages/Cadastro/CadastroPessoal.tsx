import React, { useEffect } from 'react';
import {
  Button,
  Label,
  Fieldset,
  Input,
  Form,
  Titulo,
  ErrorMessage,
} from '../../components';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

// SOBRE O USE MASK
// O componente Input filho está recebendo as props (inputProps) que o InputMask
// gera e fornece. Essas props incluem o valor mascarado, eventos de mudança, e
// outras propriedades necessárias para o funcionamento da máscara.

// SOBRE O SPREAD NO REGISTER
// Os três pontos (...) espalham todas as propriedades do objeto retornado pelo
// register no componente, facilitando a integração com o React Hook Form.
// Retorna um objeto com várias props (como onChange, onBlur, ref, etc.) que
// são necessárias para o controle do campo pelo formulário.

interface CadastroPessoalProps {
  setShowEndereco: React.Dispatch<React.SetStateAction<boolean>>;
}

const CadastroPessoal = ({ setShowEndereco }: CadastroPessoalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: 'all',
  });

  const password = watch('password');

  function handleSubmitForm(dados: any) {
    console.log('Dados do formulário:', dados);
    localStorage.setItem('pessoal', JSON.stringify(dados));
    setShowEndereco(true);
  }

  const validateEmail = {
    obrigatorio: (val: string) => !!val || 'O campo email é obrigatório.',
    formatoValido: (val: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
      'O campo email deve ser um email válido.',
  };

  const validatePassword = {
    obrigatorio: (val: string) => !!val || 'O campo senha é obrigatório.',
    tamanhoMinimo: (val: string) =>
      val.length >= 6 || 'A senha deve ter no mínimo 6 caracteres.',
  };

  const validatePasswordConfirmation = {
    obrigatorio: (val: string) =>
      !!val || 'Por favor, insira a senha novamente.',
    tamanhoMinimo: (val: string) =>
      val.length >= 6 || 'A senha deve ter no mínimo 6 caracteres.',
    senhasDiferentes: (val: string) =>
      val === password || 'As senhas não correspondem.',
  };

  const campos = [
    {
      label: 'Nome',
      id: 'name',
      validation: {
        required: 'O nome é obrigatório',
      },
      type: 'text',
    },
    {
      label: 'E-mail',
      id: 'email',
      validation: {
        validate: validateEmail,
      },
      type: 'email',
    },
    {
      label: 'Telefone',
      id: 'phone',
      validation: {
        required: 'O nome é obrigatório',
      },
      mask: '(99) 99999-9999',
      type: 'text',
    },
    {
      label: 'Crie uma senha',
      id: 'password',
      type: 'password',
      validation: {
        validate: validatePassword,
      },
    },
    {
      label: 'Repita a senha',
      id: 'passwordConfirmation',
      type: 'password',
      validation: {
        validate: validatePasswordConfirmation,
      },
    },
  ];

  useEffect(() => {
    const dados = localStorage.getItem('pessoal');
    if (dados) {
      reset(JSON.parse(dados));
    }
  }, []);

  return (
    <>
      <Titulo>Insira alguns dados básicos:</Titulo>
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        {campos.map((campo) => (
          <Fieldset key={campo.id}>
            <Label htmlFor={campo.id}>{campo.label}</Label>
            {'mask' in campo ? (
              <InputMask
                mask={campo.mask ?? ''}
                {...register(campo.id, campo.validation)}
              >
                {(inputProps: any) => (
                  <Input id={campo.id} type={campo.type} {...inputProps} />
                )}
              </InputMask>
            ) : (
              <Input
                id={campo.id}
                type={campo.type}
                {...register(campo.id, campo.validation)}
              />
            )}
            {errors[campo.id]?.message && (
              <ErrorMessage>{String(errors[campo.id]?.message)}</ErrorMessage>
            )}
          </Fieldset>
        ))}
        <Button type="submit">Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroPessoal;
