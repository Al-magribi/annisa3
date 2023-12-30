import {
  Box,
  Fade,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { format } from "date-fns";
import { updateExam } from "../../../Redux/Exam/exam_action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

const Edit = ({ open, close }) => {
  const dispatch = useDispatch();

  const { loading, detail: exam } = useSelector((state) => state.detailExam);

  const { loading: updateLoading, isUpdated } = useSelector(
    (state) => state.upDelExam
  );

  const { userInfo: user } = useSelector((state) => state.userLogin);
  const { grades } = useSelector((state) => state.grades);

  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const [teacherId, setTeacherId] = useState("");
  const [name, setName] = useState("");
  const [end, setEnd] = useState(null);
  const [start, setStart] = useState(null);
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [choice, setChoice] = useState("0");
  const [essay, setEssay] = useState("0");
  const [passing, setPassing] = useState("");
  const [display, setDisplay] = useState("");
  const [remed, setRemed] = useState("");

  useEffect(() => {
    const initialDate = setHours(setMinutes(new Date(), 0), 9);
    setStart(initialDate);
  }, []);

  useEffect(() => {
    if (exam) {
      setTeacherId(exam?.user._id);
      setName(exam?.name);
      setStart(null);
      setEnd(null);
      setSubject(exam?.subject);
      setGrade(exam?.grade);
      setChoice(exam?.choice);
      setEssay(exam?.essay);
      setPassing(exam?.passing);
      setDisplay(exam?.display);
      setRemed(exam?.remedial);
    }

    if (isUpdated) {
      close();
    }
  }, [exam, isUpdated]);

  const updateHandler = (e) => {
    e.preventDefault();

    const startTime = format(start, "yyyy-MM-dd HH:mm");
    const endTime = format(end, "yyyy-MM-dd HH:mm");

    const data = {
      user: teacherId,
      name: name,
      start: startTime,
      end: endTime,
      subject: subject,
      grade: grade,
      choice: choice,
      essay: essay,
      passsing: passing,
      display: display,
      remedial: remed,
    };

    dispatch(updateExam(exam?._id, data));
  };

  return (
    <div>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 400 },
            height: 600,
            overflow: "auto",
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
          }}
        >
          {loading || updateLoading ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <form
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
              onSubmit={updateHandler}
            >
              {/* TINGKAT */}
              <FormControl required fullWidth sx={{ mb: 2 }}>
                <InputLabel id='demo-simple-select-label'>
                  --Pilih Tingkat--
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={grade}
                  label='--Pilih Guru--'
                  onChange={(e) => setGrade(e.target.value)}
                >
                  {grades?.map((grade) => (
                    <MenuItem key={grade._id} value={grade.grade}>
                      {grade.grade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl required fullWidth sx={{ mb: 2 }}>
                <InputLabel id='demo-simple-select-label'>
                  --Tampil Nilai--
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={display}
                  label=' --Tampil Nilai--'
                  onChange={(e) => setDisplay(e.target.value)}
                >
                  <MenuItem value='yes'>Ya</MenuItem>
                  <MenuItem value='no'>Tidak</MenuItem>
                </Select>
              </FormControl>

              <FormControl required fullWidth sx={{ mb: 2 }}>
                <InputLabel>Remedial</InputLabel>
                <Select
                  value={remed}
                  label='Remedial'
                  onChange={(e) => setRemed(e.target.value)}
                >
                  <MenuItem value='yes'>Ya</MenuItem>
                  <MenuItem value='no'>Tidak</MenuItem>
                </Select>
              </FormControl>

              <TextField
                required
                fullWidth
                name='name'
                label='Nama Ujian'
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                fullWidth
                name='subject'
                label='Mata Pelajaran'
                value={subject || ""}
                onChange={(e) => setSubject(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                fullWidth
                name='choice'
                label='Bobot PG'
                value={choice || ""}
                onChange={(e) => setChoice(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                fullWidth
                name='essay'
                label='Bobot Essay'
                value={essay || ""}
                onChange={(e) => setEssay(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                required
                fullWidth
                name='passing'
                label='KKM'
                value={passing || ""}
                onChange={(e) => setPassing(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Box
                sx={{
                  width: "100%",
                  height: 60,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  flexDirection: "column",
                  mb: 2,
                }}
              >
                <Typography sx={{ mb: 1 }}>Mulai</Typography>
                <DatePicker
                  selected={start}
                  onChange={(date) => setStart(date)}
                  showTimeSelect
                  filterTime={filterPassedTime}
                  dateFormat='MMMM d, yyyy h:mm aa'
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  height: 60,
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  flexDirection: "column",
                  mb: 2,
                }}
              >
                <Typography sx={{ mb: 1 }}>Selesai </Typography>
                <DatePicker
                  selected={end}
                  onChange={(date) => setEnd(date)}
                  showTimeSelect
                  filterTime={filterPassedTime}
                  dateFormat='MMMM d, yyyy h:mm aa'
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                  mt: 2,
                }}
              >
                <Button variant='contained' color='success' type='submit'>
                  Update
                </Button>
                <Button variant='contained' color='error' onClick={close}>
                  batalkan
                </Button>
              </Box>
            </form>
          )}
        </Box>
      </Fade>
    </div>
  );
};

export default Edit;
