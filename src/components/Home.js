import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { registerables } from "chart.js";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import {
  Box,
  Button,
  Text,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
} from "@chakra-ui/react";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    date: "",
  });
  const [editExpense, setEditExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExpense = () => {
    setExpenses([...expenses, newExpense]);
    setNewExpense({
      Description: "",
      Amount: "",
      Date: "",
    });
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleEditExpense = (index) => {
    setEditExpense(index);
    setIsModalOpen(true);
  };

  const handleSaveEditExpense = () => {
    setExpenses(
      expenses.map((expense, index) =>
        index === editExpense ? { ...newExpense } : expense
      )
    );
    setIsModalOpen(false);
    setEditExpense(null);
    setNewExpense({
      Description: "",
      Amount: "",
      Date: "",
    });
  };

  const chartData = {
    labels: expenses.map((expense) => expense.description),
    datasets: [
      {
        label: "Expenses",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <Box width={"100vw"} height={"100vh"}>
      <Heading
        marginBottom={"5vh"}
        marginTop={"5vh"}
        fontSize="3xl"
        textAlign={"center"}
        color={"blue.700"}
      >
        Expense Tracker
      </Heading>

      <Flex
        alignItems="center"
        justifyContent="space-around"
        width={"100vw"}
        height={"50vh"}
      >
        <Box>
          <Flex flexDirection={"column"} margin={"5px"}>
            <Text
              fontSize={"2xl"}
              fontWeight={"medium"}
              margin={"2px"}
              color={"blue.700"}
            >
              Description
            </Text>
            <Input
              border={"1px solid black"}
              name="description"
              value={newExpense.description}
              onChange={handleInputChange}
              borderRadius={"0px"}
            />
          </Flex>
          <Flex flexDirection={"column"} margin={"5px"}>
            <Text
              fontSize={"2xl"}
              fontWeight={"medium"}
              margin={"2px"}
              color={"blue.700"}
            >
              Amount
            </Text>
            <Input
              border={"1px solid black"}
              name="amount"
              type="number"
              value={newExpense.amount}
              onChange={handleInputChange}
              borderRadius={"0px"}
            />
          </Flex>
          <Flex flexDirection={"column"} margin={"5px"}>
            <Text
              fontSize={"2xl"}
              fontWeight={"medium"}
              margin={"2px"}
              color={"blue.700"}
            >
              Date
            </Text>
            <Input
              name="date"
              type="date"
              value={newExpense.date}
              onChange={handleInputChange}
              border={"1px solid black"}
              borderRadius={"0px"}
            />
          </Flex>
          <Button
            width={"20vw"}
            border={"1px solid black"}
            backgroundColor={"blue.300"}
            onClick={handleAddExpense}
            borderRadius={"0px"}
            marginTop={"3vh"}
          >
            Add Expense
          </Button>
        </Box>

        <Box width="30%">
          <Pie data={chartData} />
        </Box>
      </Flex>

      <Box margin={"10vh"} boxShadow={"-15px -15px 30px #ffffff;"}>
        <Table>
          <Thead>
            <Tr>
              <Th
                fontSize={"2xl"}
                fontWeight={"medium"}
                margin={"2px"}
                color={"blue.700"}
              >
                Description
              </Th>
              <Th
                fontSize={"2xl"}
                fontWeight={"medium"}
                margin={"2px"}
                color={"blue.700"}
              >
                Amount
              </Th>
              <Th
                fontSize={"2xl"}
                fontWeight={"medium"}
                margin={"2px"}
                color={"blue.700"}
              >
                Date
              </Th>
              <Th
                fontSize={"2xl"}
                fontWeight={"medium"}
                color={"blue.700"}
                marginLeft={"20vh"}
              >
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map((expense, index) => (
              <Tr key={index}>
                <Td
                  fontSize={"xl"}
                  fontWeight={"small"}
                  margin={"2px"}
                  color={"blue.700"}
                >
                  {expense.description}
                </Td>
                <Td
                  fontSize={"xl"}
                  fontWeight={"small"}
                  margin={"2px"}
                  color={"blue.700"}
                >
                  {expense.amount}
                </Td>
                <Td
                  fontSize={"xl"}
                  fontWeight={"small"}
                  margin={"2px"}
                  color={"blue.700"}
                >
                  {expense.date}
                </Td>
                <Td display={"flex"}>
                  <Button
                    onClick={() => handleEditExpense(index)}
                    width={"10vw"}
                    border={"1px solid black"}
                    backgroundColor={"blue.300"}
                    marginTop={"3vh"}
                    borderRadius={"0px"}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteExpense(index)}
                    width={"10vw"}
                    border={"1px solid black"}
                    backgroundColor={"blue.300"}
                    marginTop={"3vh"}
                    marginLeft={"5vh"}
                    borderRadius={"0px"}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={newExpense.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                name="amount"
                type="number"
                value={newExpense.amount}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                name="date"
                type="date"
                value={newExpense.date}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveEditExpense}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
