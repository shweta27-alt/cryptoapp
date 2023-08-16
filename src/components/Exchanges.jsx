import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader"

const Exchanges = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchExchanges = async () => {
        const { data } = await axios.get(`${server}/exchanges`);
        console.log(data);
        setExchanges(data);
        setLoading(false);
      };
      fetchExchanges();
    },
    []);
  return <Container maxW={"container.xl"}>
   {loading ? <Loader/> : (
    <>
      <HStack wrap={"wrap"}>
        {exchanges.map((i)=>{
            <div>{i.name}</div>
        })}
      </HStack>
    </>
   )}
  </Container>;
};

export default Exchanges;
