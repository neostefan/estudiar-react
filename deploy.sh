CWD=`pwd`

if [ -e "$CWD/dockerfile" ]
then
    npm run build
    docker image build -t estudiar:react .
    docker container run -d --name estudiar-web -p 80:80 estudiar:react
else
    echo "No dockerfile found for deployment"
fi