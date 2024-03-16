import { Box, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import { themeApp } from "../utils/Theme";
import { getEventById } from "../api/event";
import { Ievent } from "../interface/Ievent";

export default function Event() {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [eventData, setEventData] = useState<Ievent>();
    const [userName, setUsername] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEventById(eventId ?? "");
            console.log(data);
            setEventData(data);
        };

        fetchData();
    }, [eventId]);

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleContinue = () => {
        if (userName) {
            navigate(`/event/${userName}`);
        } else {
            setError("Please type your name!");
        }
    };

    function stringAvatar(name: string) {
        return {
            sx: {
                fontSize: "36px",
                bgcolor: "#D9D9D9",
                width: "100px",
                height: "100px",
                color: "black",
                border: "1px solid black"
            },
            children: `${name.slice(0, 2).toUpperCase()}`,
        };
    }

    return (
        <Box
            sx={{
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                textAlign: "center",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                [themeApp.breakpoints.down('sm')]: {
                    width: "90%"
                },
                [themeApp.breakpoints.up('md')]: {
                    width: "70%"
                },
                [themeApp.breakpoints.up('lg')]: {
                    width: "50%"
                }
            }}
        >



            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar {...stringAvatar(`${eventData?.ownerName}`)} sx={{ width: "100px", height: "100px" }} />
            </Box>
            {eventData !== undefined && (
                <>
                    <Typography color={"black"} fontSize={"36px"} fontWeight={"bold"}>
                        {eventData?.title}
                    </Typography>
                    <Typography color={"#6C6C6C"} fontSize={"17px"}>
                        {eventData?.ownerName}
                    </Typography>
                </>
            )}
            <FormControl sx={{ width: '100%', marginTop: "32px" }} variant="outlined">
                <InputLabel htmlFor="What should everyone call you?">What should everyone call you?</InputLabel>
                <OutlinedInput
                    sx={{ borderRadius: "14px" }}
                    value={userName}
                    onChange={handleName}
                    endAdornment={
                        <InputAdornment position="end">
                            {
                                userName ? (
                                    <IconButton
                                        edge="end"
                                        sx={{ border: "0px" }}
                                        onClick={() => setUsername('')}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                ) : (
                                    <></>
                                )
                            }
                        </InputAdornment>
                    }
                    label="What should everyone call you?"
                />
            </FormControl>
            {(error !== '' && !userName) && (
                <Typography color={"red"}>
                    {error}
                </Typography>
            )}
            <Button
                variant="outlined"
                sx={{
                    height: "61px", width: "398px", background: "black",
                    color: "white", borderRadius: "14px", marginTop: "24px",
                    "&:hover": {
                        background: "black",
                        color: "white",
                    },
                }}
                onClick={handleContinue}
            >
                Join the event
            </Button>
            <Button
                variant="outlined"
                sx={{
                    height: "61px",
                    width: "398px",
                    color: "black",
                    borderRadius: "14px",
                    marginTop: "24px",
                    border: "1px solid black",
                    "&:hover": {
                        background: "white",
                        color: "black",
                        border: "1px solid black"
                    },
                }}
                onClick={() => navigate('/')}
            >
                Leave
            </Button>

            <Typography color={"#6C6C6C"} fontSize={"17px"} sx={{ marginTop: "32px" }}>
                Want to be a host? <u style={{ cursor: "pointer" }} onClick={() => navigate("/host")}>Create</u>
            </Typography>
        </Box>
    );
}
