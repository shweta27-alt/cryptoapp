import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchExchanges();
  }, []);

  const fetchExchanges = async () => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/exchanges"
      );
      setExchanges(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error)
    }
  };

  if(error) return <Error message={"Error while fetching exchanges"}/>

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {exchanges.map((i) => (
            <ExchangeCard
              key={i.id}
              name={i.name}
              img={i.image}
              rank={i.trust_score_rank}
              url={i.url}
            />
          ))}
        </HStack>
      )}
    </Container>
  );
};

export default Exchanges;

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target="blank">
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{ "&:hover": { transform: "scale(1.1)" } }}
    >
      <Image
        src={img}
        w={"10"}
        h={"20"}
        objectFit={"contain"}
        alt={"Exchanges"}
      />

      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

