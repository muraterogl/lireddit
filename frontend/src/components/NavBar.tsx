import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery();
    let body = null;

    //data is loading
    if (fetching) {
    }
    //user not logged in
    else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={2}>login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>register</Link>
                </NextLink>
            </>
        );
    }
    //user is logged in
    else {
        body = (
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button
                    onClick={() => {
                        logout();
                    }}
                    isLoading={logoutFetching}
                    variant="link"
                >
                    logout
                </Button>
            </Flex>
        );
    }
    return (
        <Flex bg="tan" p={4}>
            <Box ml={"auto"}>{body}</Box>
        </Flex>
    );
};

export default NavBar;
