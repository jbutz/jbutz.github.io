---
layout: post.html
title: "BT Sync & AWS"
date: 2015-03-11
tags: BT Sync,AWS
---
[BitTorrent Sync (BT Sync)](https://www.getsync.com/) is a tool that can be used to synchronize files between devices using [peer-to-peer (P2P)](http://en.wikipedia.org/wiki/Peer-to-peer), technology. Using this method means that no server is storing the files between your devices. Think of it as a theoretically more secure Dropbox. I say theoretically because BT Sync is not open source, so we don't really know what it is doing beneath the covers.

I've been trying out BT Sync for a little while now and I think it is pretty good. The recent update to version 2.0 was much needed. I have it setup on my phone and my home computer. The one thing I miss is the ability to shutdown my home computer but still be able to sync files. Since BT Sync has a linux version I decided to give installing it on [Amazon Web Services (AWS)](http://aws.amazon.com) a try. It turned out to be fairly easy. Below are some rough steps to get it setup. I'm not going to include anything to walk you through the setup of an EC2 instance, but I used the Ubuntu Server quick start option and set the instance type to t2.micro. All you are doing is running Bt Sync, you don't need much power. A Raspberry Pi B+ can run it without issue, trust me I did it. I will assume you used the Ubuntu quick start and have logged in to your instance via SSH. Be sure to keep the EC2 Management Console up as well, we will need to open a few ports.

1. First you need to download the program to your EC2 instance. In the SSH window to your EC2 instance type/copy-paste in  
   `wget https://download-cdn.getsyncapp.com/stable/linux-x64/BitTorrent-Sync_x64.tar.gz`  
   and hit enter. This will download the file.
2. Now we need to extract it, type in `tar -xvvzf BitTorrent-Sync_x64.tar.gz` and press enter.
3. In your EC2 Management Console click on the EC2 instance you created for BT Sync, then click on the link next to *Security groups*.
4. Now you should be looking at the Security Group used for the instance. Click the *Inbound* tab, then click the *Edit* button.
5. Now add a *Custom TCP Rule* with the Port Range as *8888* and the Source as *Anywhere*. Then click Save.
6. Head back to your SSH console and run `./btsync`. This starts BT Sync in the background
7. Get your *Public DNS* url from your EC2 Management Console and put that into your browser at port 8888. It will be something like `http://ec2-00-00-00-00.us-west.compute.amazonaws.com:8888`. You should see the BT Sync interface and it should help you get everything setup.
8. Click the cog in the upper-right corner, then click *Preferences*, then click *Advanced*. Make note of the *Listening Port*. You will want that later. Next we need to make sure BT Sync runs on startup of the EC2 instance.
9. In your SSH terminal type the following  
   `killall btsync`  
   `sudo mv btsync /usr/local/bin/btsync`  
   `sudo chown root:root /usr/local/bin/btsync`  
   `sudo chmod 755 /usr/local/bin/btsync`  
9. Go to [this gist](https://gist.github.com/MendelGusmao/5398362) by Mendelson Gusmao. Click the *Raw* button next to the *btsync* file. Copy the URL of that raw output.
10. In your SSH terminal run `wget [PASTE URL HERE]` to download the file.
11. Using whatever text editor you want edit the new *btsync* file. Replace `BTSYNC_USERS="mendel"` with `BTSYNC_USERS="ubuntu"`
12. Run the following commands to move the file into place and to set the permissions  
   `sudo mv btsync /etc/init.d/btsync`  
   `sudo chown root:root /etc/init.d/btsync`  
   `sudo chmod +x /etc/init.d/btsync`  
13. Now we need to create a config file for btsync. Run this command:  
   `btsync --dump-sample-config > /home/ubuntu/.sync/config.json`
14. Open */home/ubuntu/.sync/config.json* in your text editor. The first few lines will look like this:  
   `{`  
   `"device_name": "My Sync Device",`  
   `"listening_port" : 0, // 0 - randomize port`  
   `/* storage_path dir contains auxilliary app files if no storage_path field: .sync dir created in the directory where binary is located. otherwise user-defined directory will be used */`  
   `// "storage_path" : "/home/user/.sync",`  
   Change *My Sync Device* to whatever you want, leaving the quotes intact. Change the listening port to the value to wrote down earlier.
   Remove the `//` before the *storage_path* line and change `/home/user/.sync` to `/home/ubuntu/.sync`. Save the file and the config is done.
15. Run `sudo update-rc.d btsync defaults` to make sure everything runs on startup.
16. Run `sudo /etc/init.d/btsync start` to start the daemon. It should say *Starting BTSync for ubuntu*. Go to the URL you used in step 7 to make sure it is running
17. Follow steps 3 - 5 again, only this time use the listening port number you used earlier.

That's all there is to it.

