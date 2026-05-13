    <template>
        <div class="tela">
            
            <div class="table">
            <table>
                <thead>
        <tr>
            <th>Destino</th>
            <th>Data</th>
            <th>Viatura</th>
            <th>Mais informaçoes</th>
        </tr>
        </thead> 

            <tbody>
      <tr >
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
        </table>   
            </div>

        </div>
    </template>

    <script>
    </script>

<style scoped>
.table {
  width: 100%;
  overflow-x: auto;
  margin-top: 30px;
}

table {
 width: 80%;
 min-width: 400px;
 border-collapse: collapse;
 background: white;
 border-radius: 8px;
 overflow: hidden;
 box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

th, td {
  padding: 12px 16px;
  text-align: left;
}

@media (max-width:600px)  {
  .main {
    padding: 40px 16px;
  }

  .botao-cadastrar {
    width: 100%;
    font-size: 12px;
    padding: 10px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  table {
    min-width: unset;
    width: 100%;
  }

  th, td {
    padding: 8px 6px;
    font-size: 11px;
  }
}

</style>