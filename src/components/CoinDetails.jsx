import {
  Container,
  RadioGroup,
  HStack,
  Radio,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Error from "./Error";

const CoinDetails = () => {
  const [coins, setCoins] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const params = useParams();

  const currencySymbol = currency === "inr"? "₹" : currency === "eur"? "€" : "$";

  useEffect(() => {
    fetchCoins();
  }, [params.id]);

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.id}`
      );
      setCoins(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  if (error) return <Error message={"Error while fetching coin"} />;

  return (
    <Container maxw={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
            sdbbbbbgj
          </Box>

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
              Last Upadted on {Date(coins.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coins.image.large} w={"16"} objectFit={"contain"} />
            <Stat>
              <StatLabel>{coins.name}</StatLabel>
              <StatNumber>{currencySymbol}{coins.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type= {coins.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
                  {coins.market_data.price_change_percentage_24h}%
                
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
              {`#${coins.market_cap_rank}`}
            </Badge>

            <CustomBar high={`${currencySymbol}${coins.market_data.high_24h[currency]}`} 
                       low={`${currencySymbol}${coins.market_data.low_24h[currency]}`}/>
          </VStack>
        </>
      )}
    </Container>
  );
};

export default CoinDetails;


const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme={"teal"} w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};

