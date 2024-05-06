import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
// Componente ModalComp responsável pelo formulário de cadastro de clientes
const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  // State hooks para controlar os inputs do formulário
  const [tecnico, setTecnico] = useState(dataEdit.tecnico || "");
  const [dataserv, setDataserv] = useState(dataEdit.dataserv || "");
  const [Clientes, setCliente] = useState(dataEdit.Clientes || "");
  const [local, setLocal] = useState(dataEdit.local || "");
  const [servico, setServico] = useState(dataEdit.servico || "");

  // Função para salvar os dados do formulário
  const handleSave = () => {
    // Verifica se algum campo obrigatório está vazio
    if (!tecnico || !dataserv || !Clientes || !local || !servico) return;

    // Cria um novo array de dados com os novos dados ou dados editados
    const newDataArray = Object.keys(dataEdit).length
      ? data.map((item, index) =>
          index === dataEdit.index ? { tecnico, dataserv, Clientes, local, servico } : item
        )
      : [...(data || []), { tecnico, dataserv, Clientes, local, servico }];

    // Atualiza os dados no localStorage
    localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

    // Atualiza o state com os novos dados
    setData(newDataArray);

    // Fecha o modal
    onClose();
  };

  return (
    <>
      {/* Componente Modal do Chakra UI */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* Cabeçalho do modal */}
          <ModalHeader>Registrar novo chamado</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Formulário de cadastro */}
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                {/* Label e input para o campo Técnico */}
                <FormLabel>Técnico</FormLabel>
                <Input
                  type="text"
                  value={tecnico}
                  onChange={(e) => setTecnico(e.target.value)}
                />
              </Box>
              <Box>
                {/* Label e input para o campo Data de Serviço */}
                <FormLabel>Data de Serviço</FormLabel>
                <Input
                  type="text"
                  value={dataserv}
                  onChange={(e) => setDataserv(e.target.value)}
                />
              </Box>
              <Box>
                {/* Label e input para o campo Cliente */}
                <FormLabel>Cliente</FormLabel>
                <Input
                  type="text"
                  value={Clientes}
                  onChange={(e) => setCliente(e.target.value)}
                />
              </Box>
              <Box>
                {/* Label e input para o campo Local */}
                <FormLabel>Local</FormLabel>
                <Input
                  type="text"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                />
              </Box>
              <Box>
                {/* Label e input para o campo Serviço */}
                <FormLabel>Serviço</FormLabel>
                <Input
                  type="text"
                  value={servico}
                  onChange={(e) => setServico(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          {/* Rodapé do modal com botões de ação */}
          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
