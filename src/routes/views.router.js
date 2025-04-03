import { Router } from "express";

const router = Router();

router.get("/reg", async (req, res) => {
  res.render("index");
});
export default router;
