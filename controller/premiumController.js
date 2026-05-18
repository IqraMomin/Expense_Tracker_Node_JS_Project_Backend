const { Op ,Sequelize} = require("sequelize");
const { Users, Expense } = require("../models");

const fetchExpense = async (req, res) => {
  try {
    const { id } = req.user;
    const { type, date } = req.query;
    console.log(req.query.date);

    const ITEMS_PER_PAGE =
      parseInt(req.query.limit) || 2;

    const page =
      parseInt(req.query.page) || 1;

    // check premium user
    const user = await Users.findByPk(id);

    if (!user.isPremium) {
      return res.status(401).json({
        message: "User not Authorized",
      });
    }

    // default where clause
    let whereClause = {
      UserId: id,
    };

    // selected date from frontend
    const selectedDate = date
      ? new Date(date)
      : new Date();

    // =========================
    // DAILY EXPENSES
    // =========================
    if (type === "daily") {

      const start = new Date(selectedDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(selectedDate);
      end.setHours(23, 59, 59, 999);

      whereClause.createdAt = {
        [Op.between]: [start, end],
      };
    }

    // =========================
    // WEEKLY EXPENSES
    // =========================
    else if (type === "weekly") {

      const start = new Date(selectedDate);

      start.setDate(
        selectedDate.getDate() - 7
      );

      whereClause.createdAt = {
        [Op.between]: [start, selectedDate],
      };
    }

    // =========================
    // MONTHLY EXPENSES
    // =========================
    else if (type === "monthly") {

        const year = selectedDate.getFullYear();
      
        const month = selectedDate.getMonth() + 1;
      
        whereClause[Op.and] = [
          Sequelize.where(
            Sequelize.fn(
              "MONTH",
              Sequelize.col("createdAt")
            ),
            month
          ),
      
          Sequelize.where(
            Sequelize.fn(
              "YEAR",
              Sequelize.col("createdAt")
            ),
            year
          ),
        ];
      }

    // fetch expenses
    const {
      count,
      rows: expenses,
    } = await Expense.findAndCountAll({
      attributes: [
        "id",
        "description",
        "amount",
        "createdAt",
      ],

      where: whereClause,

      limit: ITEMS_PER_PAGE,

      offset:
        (page - 1) * ITEMS_PER_PAGE,

      order: [["createdAt", "DESC"]],
    });

    // response
    console.log(expenses);
    res.json({
      expenses,

      currentPage: page,

      isPreviousPage: page > 1,

      isNextPage:
        ITEMS_PER_PAGE * page < count,

      nextPage: page + 1,

      previousPage: page - 1,

      lastPage: Math.ceil(
        count / ITEMS_PER_PAGE
      ),
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  fetchExpense,
};