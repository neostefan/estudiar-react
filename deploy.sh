docker container run -d --name estudiar-web -p 80:80 --network estudiar neostefan/estudiar-web:0.3

# version: '2.1'
# jobs:
#   build:
#     working_directory: ~/estudiar-web
#     docker:
#       - image: 'cimg/node:16.14.2'
#     steps:
#       - checkout
#       - add_ssh_keys:
#           fingerprints:
#             - "59:44:d2:9c:96:ca:37:81:1f:f7:3b:f8:09:b0:19:a3"
#       - run:
#           command: |
#             npm install
#             git config --global user.email stephen.adingupu@gmail.com
#             git config --global user.name stephen
#             npm run predeploy
#             npm run deploy
# workflows:
#   build-deploy-ghpages:
#     jobs:
#       - build