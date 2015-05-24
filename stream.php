<?php

require_once "vendor/autoload.php";
while (ob_get_level()) ob_end_clean();

$file = $argv[1];

// Use SQLite cell cache (significantly reduces memory usage)
$cacheMethod = \PHPExcel_CachedObjectStorageFactory::cache_to_sqlite3;
\PHPExcel_Settings::setCacheStorageMethod($cacheMethod);

$reader = PHPExcel_IOFactory::createReaderForFile($file)
  ->setReadDataOnly(true);

$excel = $reader->load($file);

PHPExcel_IOFactory::createWriter($excel, 'CSV')->save('php://stdout');
