import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ModalComp from "./components/ModalComp";

// Componente principal da aplicação
const App = () => {
  // Hooks de estado e função de controle do modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]); // Estado para armazenar os dados
  const [dataEdit, setDataEdit] = useState({}); // Estado para armazenar os dados editados
  const isMobile = useBreakpointValue({ // Determina se é um dispositivo móvel ou não
    base: true,
    lg: false,
  });

  // Efeito que carrega os dados do localStorage ao iniciar a aplicação
  useEffect(() => {
    const db_customer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];
    setData(db_customer);
  }, []);

  // Função para remover um item da lista
  const handleRemove = (index) => {
    const newArray = [...data];
    newArray.splice(index, 1);
    setData(newArray);
    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CHAMADO
        </Button>
        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                {/* Cabeçalhos da tabela */}
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Técnico
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Data de Serviço
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Cliente
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Local
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Serviço
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Mapeia os dados para criar as linhas da tabela */}
              {data.map(({ tecnico, dataserv, Clientes, local, servico }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{tecnico}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{dataserv}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{Clientes}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{local}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{servico}</Td>
                  <Td p={0}>
                    {/* Ícone de edição */}
                    <EditIcon
                      fontSize={20}
                      onClick={() => [setDataEdit({ tecnico, dataserv, Clientes, local, servico, index }), onOpen()]}
                    />
                  </Td>
                  <Td p={0}>
                    {/* Ícone de exclusão */}
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {/* Modal de cadastro e edição */}
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
        />
      )}
    </Flex>
  );
};

export default App;
