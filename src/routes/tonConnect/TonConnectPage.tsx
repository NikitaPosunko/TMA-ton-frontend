import { useCallback, useEffect, useState } from "react";
import {
  SendTransactionRequest,
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { Loading } from "../../components/Components";
import { Box, Button, Typography } from "@mui/material";
import { backendAxios } from "../../utils/axiosConfig";
import {
  BACKEND_USER_BALANCE_REQUEST,
  BACKEND_USER_WALLET_CONFIRMATION_REQUEST,
} from "../../static/url";
import { useNavigate } from "react-router-dom";
import { useErrorContext } from "../../contexts/useContext";
import { ERROR_ROUTE } from "../../static/routes";
import { UserBalanceDto } from "../../types/userBalanceResponseType";
import { LinkToLoginPage } from "../../components/Links";

export const TonConnectPage = () => {
  const [loading, setLoading] = useState(true);
  const [tonConnectUI] = useTonConnectUI();
  const connectedAddress = useTonAddress(true);
  const [userTonBalance, setUserTonBalance] = useState<string | null>(null);
  // const [userWalletAddress, setUserWalletAddress] = useState<string | null>(
  //   connectedAddress
  // );
  //const [adminWalletAddress, setAdminWalletAddress] = useState<string>("");

  ///

  //const isAlreadyRendered = useRef(false); // Track the first render

  // error handling
  const navigate = useNavigate();
  const errorContext = useErrorContext();

  const handleError = useCallback(
    (error: { message: string }) => {
      errorContext.setError(error.message);
      console.log(errorContext.errorMessage);
      navigate(ERROR_ROUTE, { replace: true });
    },
    [errorContext, navigate]
  );

  // main part

  // ------------------------------ buy subscription ------------------------------ //

  const buySubscription = async () => {
    setLoading(true);
    try {
      // 1. backend user wallet confirmation
      const response = await backendAxios.post(
        BACKEND_USER_WALLET_CONFIRMATION_REQUEST,
        {
          wallet: connectedAddress,
        }
      );
      console.log(response);
      const adminWalletAddress = response.data.walletFriendlyAddress;

      // 2. buy subscription
      const transaction: SendTransactionRequest = {
        messages: [
          {
            address: adminWalletAddress,
            // TODO: get amount from backend
            amount: "20000000", //Toncoin in nanotons // 20000000 = 0.2 TON
          },
        ],
        // transaction valid for 60 seconds
        validUntil: Math.floor(Date.now() / 1000) + 360,
      };
      const result = await tonConnectUI.sendTransaction(transaction);
      console.log(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error as { message: string });
    }
  };

  const calculateAndGetUserBalance = async () => {
    setLoading(true);
    try {
      const response = await backendAxios.get(BACKEND_USER_BALANCE_REQUEST);

      const userBalanceDto: UserBalanceDto = response.data;
      const userBalance = userBalanceDto.tonCoinsBalance;
      setUserTonBalance(userBalance);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error as { message: string });
    }
  };

  useEffect(() => {
    setLoading(false);
    // TODO fetch subscription plan data from backend
    //------------------------------------------------//
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <LinkToLoginPage />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TonConnectButton />
      </Box>
      <Button
        sx={{
          mt: 2,
          mb: 2,
          //backgroundColor: "green",
        }}
        onClick={() => calculateAndGetUserBalance()}
      >
        Get user balance
      </Button>
      {userTonBalance && <Typography>{userTonBalance + " TON"}</Typography>}
      {connectedAddress && (
        <>
          <Typography variant="body1">Wallet: {connectedAddress}</Typography>
          <Button
            onClick={() => {
              buySubscription();
            }}
          >
            buy subscription --- Send transaction
          </Button>
        </>
      )}
    </Box>
  );
};
