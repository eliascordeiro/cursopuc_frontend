import { deleteTokens } from '../../auth/auth';

const Sair = () => {
  deleteTokens();
  window.location.replace("/")
};

export default Sair
