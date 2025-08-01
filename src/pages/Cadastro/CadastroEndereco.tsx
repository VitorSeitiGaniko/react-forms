import { useForm } from 'react-hook-form';
import {
  Button,
  ErrorMessage,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Titulo,
} from '../../components';

interface CadastroEnderecoProps {
  setShowEndereco: React.Dispatch<React.SetStateAction<boolean>>;
}

const CadastroEndereco = ({ setShowEndereco }: CadastroEnderecoProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      localidade: '',
    },
  });

  const cepDigitado = watch('cep');

  function handleSubmitForm(dados: any) {
    console.log('Dados do formulário:', dados);
  }

  async function getCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('Dados do CEP:', data);

      if (response.ok) {
        setValue('rua', data.logradouro);
        setValue('bairro', data.bairro);
        setValue('localidade', `${data.localidade}, ${data.uf}`);
      } else {
        throw new Error('Cep inválido');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  }

  return (
    <>
      <Titulo>Agora, mais alguns dados sobre você:</Titulo>
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Fieldset>
          <Label htmlFor="campo-cep">CEP</Label>
          <Input
            id="campo-cep"
            placeholder="Insira seu CEP"
            type="text"
            {...register('cep', { required: 'CEP é obrigatório' })}
            onBlur={() => getCep(cepDigitado)}
          />
          {errors.cep && <ErrorMessage>{errors.cep.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="campo-rua">Rua</Label>
          <Input
            id="campo-rua"
            placeholder="Rua Agarikov"
            type="text"
            {...register('rua', { required: 'Rua é obrigatória' })}
          />
          {errors.rua && <ErrorMessage>{errors.rua.message}</ErrorMessage>}
        </Fieldset>

        <FormContainer>
          <Fieldset>
            <Label htmlFor="campo-numero-rua">Número</Label>
            <Input
              id="campo-numero-rua"
              placeholder="Ex: 1440"
              type="text"
              {...register('numero', { required: 'Número é obrigatório' })}
            />
            {errors.numero && (
              <ErrorMessage>{errors.numero.message}</ErrorMessage>
            )}
          </Fieldset>

          <Fieldset>
            <Label htmlFor="campo-bairro">Bairro</Label>
            <Input
              id="campo-bairro"
              placeholder="Vila Mariana"
              type="text"
              {...register('bairro', { required: 'Bairro é obrigatório' })}
            />
            {errors.bairro && (
              <ErrorMessage>{errors.bairro.message}</ErrorMessage>
            )}
          </Fieldset>
        </FormContainer>

        <Fieldset>
          <Label htmlFor="campo-localidade">Localidade</Label>
          <Input
            id="campo-localidade"
            placeholder="São Paulo, SP"
            type="text"
            {...register('localidade', {
              required: 'Localidade é obrigatória',
            })}
          />
          {errors.localidade && (
            <ErrorMessage>{errors.localidade.message}</ErrorMessage>
          )}
        </Fieldset>
        <Button type="submit">Cadastrar</Button>
      </Form>

      <Button onClick={() => setShowEndereco(false)}>Voltar</Button>
    </>
  );
};

export default CadastroEndereco;
