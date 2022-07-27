const handleAddHive = (db) => (req, res) => {
  const { hive_id, hive_details } = req.body;
  const { user_id } = req.user;

  /* Funcionamento:
  Verificar se colmeia já foi adicionada (em "hives")
    Se sim (2):
      Verificar se descrição ("hives.hive_details") é igual a ("req.body.hive_details")
        Se sim (3):
          TENTAR inserir colmeia (em "user_hives")
            Se conseguir (4): RETORNA -> "Colmeia adicionada"
            Se não conseguir (5): RETORNA -> "Esta comleia já está adicionada"
        Se não (6):
          Atualizar descrição (em "hives")
          TENTAR inserir colmeia (em "user_hives")
            Se conseguir (7): RETORNA -> "Colmeia adicionada e descrição atualizada"
            Se não conseguir (8): RETORNA -> "Descrição atualizada"
    Se não (1):
      Inserir colmeia (em "hives")
      Inserir colmeia (em "user_hives")
      RETORNA -> "Colmeia adicionada"
  */

  return db.transaction((trx) =>
    trx("hives")
      .select("hive_id", "hive_details")
      .where({ hive_id })
      .then((data) => {
        // Funcionamento: (1)
        if (!data[0])
          return trx("hives")
            .insert({
              hive_id,
              hive_details,
              add_date: new Date(),
            })
            .then(() =>
              trx("user_hives")
                .insert({ hive_id, hive_user_id: user_id })
                .then(() => res.json({ message: "Hive added successfully" }))
            )
            .catch((error) =>
              res.status(500).json({ error: "Internal Server Error" })
            );

        // Funcionamento: (2)
        if (data[0].hive_details === hive_details)
          // Funcionamento: (3)
          return trx("user_hives")
            .select("hive_id")
            .where({
              hive_id,
              hive_user_id: user_id,
            })
            .then((user_hives_id) => {
              // Funcionamento: (4)
              if (!user_hives_id[0])
                return trx("user_hives")
                  .insert({ hive_id, hive_user_id: user_id })
                  .then(() => res.json({ message: "Hive added successfully" }))
                  .catch((error) =>
                    res.status(500).json({ error: "Internal Server Error" })
                  );

              // Funcionamento: (5)
              return res
                .status(400)
                .json({ message: "This hive is already added" });
            })
            .catch((error) =>
              res.status(500).json({ error: "Internal Server Error" })
            );

        // Funcionamento: (6)
        return trx("hives")
          .update({
            hive_details,
          })
          .where("hive_id", hive_id)
          .then(() =>
            trx("user_hives")
              .select("hive_id")
              .where({
                hive_id,
                hive_user_id: user_id,
              })
              .then((user_hives_id) => {
                // Funcionamento: (7)
                if (!user_hives_id[0])
                  return trx("user_hives")
                    .insert({ hive_id, hive_user_id: user_id })
                    .then(() =>
                      res.json({
                        message: "Hive and description added successfully",
                      })
                    )
                    .catch((error) =>
                      res.status(500).json({ error: "Internal Server Error" })
                    );

                // Funcionamento: (8)
                return res.json({ message: "Description updated" });
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json({ error: "Internal Server Error" });
              })
          );
      })
      .then(trx.commit)
      .catch(trx.rollback)
  );
};

module.exports = { handleAddHive };
