# Руководство по созданию лендингов

## Установка и запуск

##### Установка
```
npm i
``` 
##### Запуск в dev режиме
```
npm run dev -- --landing=Название папки с лендингом
```
##### Запуск build для продакшн версии
```
npm run build -- --landing=Название папки с лендингом
```

## Правила работы с репозиторием

1. В папке ``` common ``` содержатся глобальные файлы, нужные для всего репозитория. Менять там что-то стоит только при согласовании со всеми членами команды.
2. Страница лендинга должна называться ``` index.html ```
3. Должны использоваться принятые в компании правила оформления кода (БЭМ, правила вложенности в стилях и тд.)
4. Глобальные css и js файлы, подключаются в главный файл js, который находится в папке лендинга.
5. Для избежания каких-либо проблем, можно скопировать структуру лендинга с названием ``` Example ```
