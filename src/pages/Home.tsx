import { Box, Center, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";
import DButton from "../components/DButton";
import { login } from "../services/login";
import { changeLocalStorage } from "../services/storage";

const Home = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>("");
    const { setIsLoggedIn } = useContext(AppContext);
    const navigate = useNavigate();

    const validateUser = async (email: string, password: string) => {
        try {
            // Chamar a função de login da API para verificar as credenciais
            const loggedIn = await login(email, password);

            if (!loggedIn) {
                return alert('Email ou senha inválidos');
            }

            // Se o login for bem-sucedido, definir o estado de isLoggedIn como true
            setIsLoggedIn(true);
            
            // Atualizar o armazenamento local para indicar que o usuário está logado
            changeLocalStorage({ login: true });

            // Redirecionar o usuário para a próxima página após o login
            navigate('/dashboard'); // Supondo que '/dashboard' seja a rota para a página após o login
        } catch (error) {
            console.error('Ocorreu um erro ao fazer login:', error);
            alert('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
        }
    };

    return (
        <Box padding="25px">
            <Card>
                <Center>
                    <h1>Faça o login</h1>
                </Center>
                <Input placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <Input placeholder="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <Center>
                    <DButton
                        onClick={() => validateUser(email, password)}
                    />
                </Center>
            </Card>
        </Box>
    );
};

export default Home;
