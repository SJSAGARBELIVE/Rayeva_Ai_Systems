// impact.controller.js

export const createImpact = async (req, res) => {
  try {
    const { orderId, items } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "Items must be an array" });
    }

    if (items.length === 0) {
      return res.status(400).json({ error: "Items cannot be empty" });
    }

    const data = await generateImpactReport(req.body);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};