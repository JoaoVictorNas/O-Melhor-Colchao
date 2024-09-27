<?php
// Habilitar relatórios de erro para depuração
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Definir cabeçalhos de CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: text/plain; charset=UTF-8");

// Conectar ao banco de dados MySQL
$servername = "db_melhor_colc.vpshost2821.mysql.dbaas.com.br";
$username = "db_melhor_colc";
$password = "a426pRcVE@n@BL";
$dbname = "db_melhor_colc";

// Log da conexão
file_put_contents('log_debug.txt', "Tentando conectar ao banco de dados...\n", FILE_APPEND);

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    file_put_contents('log_debug.txt', "Falha na conexão: " . $conn->connect_error . "\n", FILE_APPEND);
    die("Falha na conexão: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");

file_put_contents('log_debug.txt', "Conexão bem-sucedida!\n", FILE_APPEND);

// Função para executar consultas SQL e retornar resultados
function executarConsulta($conn, $query, $params = []) {
    // Log da query executada
    file_put_contents('log_debug.txt', "Executando query: $query\n", FILE_APPEND);

    $stmt = $conn->prepare($query);

    if (!$stmt) {
        file_put_contents('log_debug.txt', "Falha na preparação da consulta: " . $conn->error . "\n", FILE_APPEND);
        die("Falha na preparação da consulta: " . $conn->error);
    }

    if (!empty($params)) {
        $stmt->bind_param(...$params);
    }

    if (!$stmt->execute()) {
        file_put_contents('log_debug.txt', "Erro na execução da consulta: " . $stmt->error . "\n", FILE_APPEND);
        die("Erro na execução da consulta: " . $stmt->error);
    }

    $result = $stmt->get_result();
    if ($result === false) {
        file_put_contents('log_debug.txt', "Erro ao obter o resultado: " . $stmt->error . "\n", FILE_APPEND);
        die("Erro ao obter o resultado: " . $stmt->error);
    }

    $data = $result->fetch_all(MYSQLI_ASSOC);
    
    // Log do resultado da consulta
    file_put_contents('log_debug.txt', "Resultado obtido: " . print_r($data, true) . "\n", FILE_APPEND);

    return $data;
}

// Verificar se o parâmetro 'path' foi passado e exibir o valor de $_GET para depuração
if (isset($_GET['path']) && !empty($_GET['path'])) {
    $path = $_GET['path'];
    file_put_contents('log_debug.txt', "Path recebido: $path\n", FILE_APPEND);

    switch ($path) {
        case 'blog':
            $query = "SELECT * FROM blog";
            $result = executarConsulta($conn, $query);
            if (empty($result)) {
                echo "Nenhum dado encontrado na tabela blog";
            } else {
                foreach ($result as $row) {
                    print_r($row);
                    echo "\n\n";
                }
            }
            break;

        case 'orgaos':
            $query = "SELECT * FROM orgaos";
            $result = executarConsulta($conn, $query);
            if (empty($result)) {
                echo "Nenhum dado encontrado na tabela orgaos";
            } else {
                foreach ($result as $row) {
                    print_r($row);
                    echo "\n\n";
                }
            }
            break;

        case 'critColch':
            $query = "SELECT * FROM critColch";
            $result = executarConsulta($conn, $query);
            if (empty($result)) {
                echo "Nenhum dado encontrado na tabela critColch";
            } else {
                foreach ($result as $row) {
                    print_r($row);
                    echo "\n\n";
                }
            }
            break;

        case 'critMarca':
            $query = "SELECT * FROM critMarca";
            $result = executarConsulta($conn, $query);
            if (empty($result)) {
                echo "Nenhum dado encontrado na tabela critMarca";
            } else {
                foreach ($result as $row) {
                    print_r($row);
                    echo "\n\n";
                }
            }
            break;

        case 'desconto':
            $query = "SELECT * FROM desconto";
            $result = executarConsulta($conn, $query);
            if (empty($result)) {
                echo "Nenhum dado encontrado na tabela desconto";
            } else {
                foreach ($result as $row) {
                    print_r($row);
                    echo "\n\n";
                }
            }
            break;

        case 'faq':
            $query = "SELECT * FROM faq";
            $result = executarConsulta($conn, $query);
            if (empty($result)) {
                echo "Nenhum dado encontrado na tabela faq";
            } else {
                foreach ($result as $row) {
                    print_r($row);
                    echo "\n\n";
                }
            }
            break;

        case 'ranking':
            $query = "SELECT * FROM ranking";
            $result = executarConsulta($conn, $query);
            if (empty($result)) {
                echo "Nenhum dado encontrado na tabela ranking";
            } else {
                foreach ($result as $row) {
                    print_r($row);
                    echo "\n\n";
                }
            }
            break;

        case 'compare':
            $query = "
                SELECT r.id, r.marca, r.produto, r.url_Imagem AS image, r.link_Produto AS site,
                    r.estrelas AS rating, r.qtd_Avaliacoes AS reviewCount, r.slug, rf.feature, rf.nota
                FROM ranking r
                LEFT JOIN ranking_features rf ON r.id = rf.ranking_id
            ";
            $result = executarConsulta($conn, $query);

            $rankingMap = [];
            foreach ($result as $row) {
                if (!isset($rankingMap[$row['id']])) {
                    $rankingMap[$row['id']] = [
                        'id' => $row['id'],
                        'brand' => $row['marca'],
                        'product' => $row['produto'],
                        'image' => $row['image'],
                        'site' => $row['site'],
                        'rating' => $row['rating'],
                        'reviewCount' => $row['reviewCount'],
                        'slug' => $row['slug'],
                        'features' => []
                    ];
                }

                if (!empty($row['feature'])) {
                    $rankingMap[$row['id']]['features'][] = [
                        'feature' => $row['feature'],
                        'rating' => $row['nota']
                    ];
                }
            }

            foreach ($rankingMap as $ranking) {
                print_r($ranking);
                echo "\n\n";
            }

            break;

        default:
            echo "Rota não encontrada";
    }
} else {
    echo "Parâmetro 'path' não fornecido ou inválido";
}

$conn->close();
?>