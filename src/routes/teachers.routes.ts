import { Router } from "express";
import { TeacherController } from "../application/useCases/Teacher/teacherController";
import { CreateTeacherUseCase } from "../application/useCases/Teacher/createTeacherUseCase";
import { DeleteTeacherUseCase } from "../application/useCases/Teacher/deleteTeacherUseCase";
import { ReadTeacherUseCase } from "../application/useCases/Teacher/readTeacherUseCase";
import { UpdateTeacherUseCase } from "../application/useCases/Teacher/updateTeacherUseCase";

// routes
const teacherRoutes = Router();

// Teacher controller
const createTeacherController = new TeacherController();

// POST
teacherRoutes.post("/", async (req, res) => {
  const createTeacher = new CreateTeacherUseCase(createTeacherController);

  try {
    const result = await createTeacher.execute(req.body);
    res.json(result.message?.data);
  } catch (error: any) {
    res.json({ error: error?.message });
  }
});

// GET ALL TEACHER
teacherRoutes.get("/", async (_, res) => {
  const readTeacher = new ReadTeacherUseCase(createTeacherController);

  try {
    const result = await readTeacher.execute();
    return res.json(result.message?.data);
  } catch (error: any) {
    res.json({ error: error?.message });
  }
});

// GET SPECIFIC TEACHER
teacherRoutes.get("/:cpf", async (req, res) => {
  const readTeacher = new ReadTeacherUseCase(createTeacherController);

  const { cpf } = req.params;

  try {
    const result = await readTeacher.execute("cpf", cpf);
    return res.json(result.message?.data);
  } catch (error: any) {
    res.json({ error: error?.message });
  }
});

//UPDATE TEACHER
teacherRoutes.put("/:cpf", async (req, res) => {
  const updateTeacher = new UpdateTeacherUseCase(createTeacherController);

  const { cpf } = req.params;

  try {
    const result = await updateTeacher.execute(req.body, cpf);
    return res.json(result.message?.data);
  } catch (error: any) {
    res.json({ error: error?.message });
  }
});

//DELETE TEACHER
teacherRoutes.delete("/:cpf", async (req, res) => {
  const deleteTeacher = new DeleteTeacherUseCase(createTeacherController);

  const { cpf } = req.params;

  try {
    const result = await deleteTeacher.execute(cpf);
    return res.json(result.message?.data);
  } catch (error: any) {
    res.json({ error: error?.message });
  }
});

export { teacherRoutes };
