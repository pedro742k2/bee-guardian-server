const getWeeksAverage = (
  db,
  hive_id,
  timeCondition,
  formatedTargetedDate,
  res
) =>
  db
    .select(
      db.raw(
        `DATE_PART('week', reading_date) AS week, AVG(weight) AS avg_weight, AVG(internal_temperature) AS avg_int_temp, AVG(external_temperature) AS avg_ext_temp, AVG(humidity) as avg_humidity, AVG(battery) as avg_battery, AVG (solar_panel_voltage) AS avg_spv, COUNT(reading_id) as reading_numbers`
      )
    )
    .from("hive_readings")
    .where("hive_id", hive_id)
    .whereRaw(
      `reading_date between ${formatedTargetedDate} - interval '${timeCondition}' and ${formatedTargetedDate}`
    )
    .groupBy("week")
    .orderBy("week")
    .then((data) => {
      if (!data[0]) return res.json({ error: "No readings available!" });

      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error." });
    });

const getDaysAveraged = (
  db,
  hive_id,
  timeCondition,
  formatedTargetedDate,
  res
) =>
  db
    .select(
      db.raw(
        "DATE_TRUNC('day', reading_date) AS day, AVG(weight) AS avg_weight, AVG(internal_temperature) AS avg_int_temp, AVG(external_temperature) AS avg_ext_temp, AVG(humidity) as avg_humidity, AVG(battery) as avg_battery, AVG (solar_panel_voltage) AS avg_spv, COUNT(reading_id) as reading_numbers"
      )
    )
    .from("hive_readings")
    .where("hive_id", hive_id)
    .whereRaw(
      `reading_date between ${formatedTargetedDate} - interval '${timeCondition}' and ${formatedTargetedDate}`
    )
    .groupBy("day")
    .orderBy("day")
    .then((data) => {
      if (!data[0]) return res.json({ error: "No readings available!" });

      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error." });
    });

const getDataFromLastHours = (
  db,
  hive_id,
  timeCondition,
  formatedTargetedDate,
  res
) =>
  db
    .select(
      "internal_temperature",
      "external_temperature",
      "humidity",
      "weight",
      "solar_panel_voltage",
      "battery",
      "reading_date"
    )
    .from("hive_readings")
    .where("hive_id", hive_id)
    .whereRaw(
      `reading_date between ${formatedTargetedDate} - interval '${timeCondition}' and ${formatedTargetedDate}`
    )
    .orderBy("reading_date")
    .then((data) => {
      if (!data[0]) return res.json({ error: "No readings available!" });

      return res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error." });
    });

const handleGetHiveData = (db) => (req, res) => {
  const { hive_id, type, targetedDate } = req.body;
  const { user_id } = req.user;

  /*
  0 -> Specific or last hour (retorn every stored reading)
  1 -> Specific or last day (retorn every stored reading)
  2 -> Specific or last week (return seven days average)
  3 -> Specific or last month (return 30 days average)
  4 -> Specific or last year (return year weeks average)
  */
  let timeCondition = "";

  switch (type) {
    case 0:
      timeCondition = "1 hour";
      break;
    case 1:
      timeCondition = "24 hours";
      break;
    case 2:
      timeCondition = "1 week";
      break;
    case 3:
      timeCondition = "1 month";
      break;
    case 4:
      timeCondition = "1 year";
      break;
    default:
      return res.status(400).json({ error: "Invalid reading type" });
  }

  const formatedTargetedDate = `to_timestamp('${new Date(
    targetedDate || Date.now()
  ).toISOString()}', 'YYYY-MM-DD')`;

  return db
    .select("hive_user_id")
    .from("user_hives")
    .where({
      hive_id,
      hive_user_id: user_id,
    })
    .then((data) => {
      if (!data[0])
        return res.status(401).json({
          error: "You do not have permission to access this hive readings.",
        });

      // If the readings interval is one year, return the weekly average
      if (type === 4)
        return getWeeksAverage(
          db,
          hive_id,
          timeCondition,
          formatedTargetedDate,
          res
        );

      // If the readings interval is one month or week, return the respective daily average
      if (type === 2 || type === 3)
        return getDaysAveraged(
          db,
          hive_id,
          timeCondition,
          formatedTargetedDate,
          res
        );

      // If the readings interval is one hour or day, return every data stored
      return getDataFromLastHours(
        db,
        hive_id,
        timeCondition,
        formatedTargetedDate,
        res
      );
    });
};

module.exports = { handleGetHiveData };
