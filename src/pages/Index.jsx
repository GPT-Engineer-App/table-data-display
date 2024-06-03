import React, { useEffect, useState } from "react";
import { Container, Table, Thead, Tbody, Tr, Th, Td, VStack, Text, Spinner, Input } from "@chakra-ui/react";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter((item) => item.city.toLowerCase().includes(searchQuery.toLowerCase()) || item.country.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()) || item.population.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Container centerContent maxW="container.lg" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" mb={4}>
          City Information
        </Text>
        <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} mb={4} />
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>City</Th>
                <Th>Country</Th>
                <Th>Description</Th>
                <Th>Population</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.city}</Td>
                  <Td>{item.country}</Td>
                  <Td>{item.description}</Td>
                  <Td>{item.population}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
