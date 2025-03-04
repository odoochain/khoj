## windows 下安装
开发指南: https://docs.khoj.dev/contributing/development

```shell
# Get Khoj Code
git clone https://github.com/khoj-ai/khoj && cd khoj

# Install Khoj for Development
pip install -e '.[dev]'
```

## 启动后端
```shell
python src/khoj/main.py --anonymous-mode
```

in web
If you're using Windows:

```shell
cd src/interface/web

yarn install

```


```shell
yarn windowswatch

```
If you're using Windows:
```bash
yarn windowswatch2
```

# windows 下开发
## Validate
### Before Making Changes

```shell
pip install pre-commit pyright isort
```

```sh
sh ./scripts/dev_setup_windows.sh
```

## 关于 git pre-commit 在windows下安装的权限问题

参考 https://docs.khoj.dev/contributing/development/#before-making-changes

```bash
pre-commit install -t pre-push -t pre-commit
```

要在默认的如 git bash 中运行 pre-commit install 命令,这样会看到原来的 Pre-commit 文件由白色也变成了绿色,也就是拥有了执行权限.

## 关于数据库升级的问题

例如我们增加了api_base_url的字段

```bash
python .\src\khoj\manage.py makemigrations
python .\src\khoj\manage.py makemigrations --merge
```
有问题直接删除,没有问题的话
```bash
python .\src\khoj\manage.py migrate
```

## 最后启动

D:\tools\scoop\apps\miniconda3\current\envs\zen12\python.exe D:\myagents\khoj\src\khoj\main.py --anonymous-mode

参数 --anonymous-mode

## pytorch 安装

```
pip uninstall torch torchvision torchaudio
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118  # 或者对应你的 CUDA 版本
```

### postgresql
```
pg_ctl register -N PostgreSQL16 -D "D:\tools\scoop\persist\postgresql\data" -w -o "-c config_file='D:\tools\scoop\persist\postgresql\data\postgresql.conf'"

```
