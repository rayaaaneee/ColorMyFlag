"use client";

import Button from "@/components/inputs/button";
import { FacebookConnectionButton, GithubConnectionButton, GoogleConnectionButton } from "@/components/inputs/custom-connection-button";
import InputText from "@/components/inputs/input-text";
import SignUpAction from "@/components/server/sign-up-action";
import Bar from "@/components/utils/bar";
import CheckboxContainer from "@/components/utils/checkbox-container";
import { HeadingOne, HeadingThree, HeadingTwo } from "@/components/utils/headings";
import type User from "@/utils/interfaces/user";
import type ActionReturn from "@/utils/types/action-return";
import { useState, type FormEvent, type FormEventHandler } from "react";
import toast from "react-hot-toast";
import LeftSide from "../../_components/left-side";
import SignLoader from "../../_components/sign-loader";

export interface SignUpComponentProps {

}

const SignUpComponent = ({}: SignUpComponentProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const onSignUp: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const form: HTMLFormElement = e.currentTarget;
        const formData: FormData = new FormData(form);
        
        const username: string = formData.get("username") as string;
        const email: string = formData.get("email") as string;
        const password: string = (formData.get("password") as string).trim();
        const confirmPassword: string = (formData.get("confirm-password") as string).trim();

        if (!username) {
            toast.error("Please enter a valid username");
            return;
        }
        if (!email) {
            toast.error("Please enter a valid email");
            return;
        }
        if (!password) {
            toast.error("Please enter a valid password");
            return;
        }
        if (!confirmPassword) {
            toast.error("Please confirm your password");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);


        const result: ActionReturn = await SignUpAction({ username, email, password } as User);
        if (result === undefined) {
            toast.success("User created successfully");
        } else if (result.status === "error") {
            toast.error(result.msg);
            setIsLoading(false);
        }

    }

    return (
        <LeftSide>
            { isLoading ? (
                <SignLoader />
            ) : (
                <>
                    <HeadingOne className="font-bold">Create an account</HeadingOne>
                    <HeadingTwo className="italic">Start your journey with us !</HeadingTwo>
                    <form onSubmit={onSignUp} className="flex flex-col gap-4 p-3 w-[600px] h-fit">
                        <div className="grid grid-flow-row-dense grid-cols-6 grid-rows-2 w-full gap-4">
                            <InputText name="username" className="col-span-2" mainColor size="xl" placeholder="Username" type="username" />
                            <InputText name="email" className="col-span-4" mainColor size="xl" placeholder="Email" type="email" />
                            <InputText name="password" className="col-span-3" mainColor size="xl" placeholder="Password" type="password" />
                            <InputText className="col-span-3" mainColor size="xl" placeholder="Confirm password" name="confirm-password" type="password" />
                        </div>
                        <CheckboxContainer size="lg" label="Remember me" id="remember-me" />
                        <Button type="submit" className="w-full bg-main text-white rounded-full text-md my-2" tooltipClassName="w-full">Sign Up</Button>
                        <Bar barClassName="border-gray-400 w-1/4">
                            <HeadingThree className="mb-0 font-semibold text-gray-400">Or with</HeadingThree>
                        </Bar>
                        <div className="flex gap-4 items-center justify-center w-full h-fit">
                            <GoogleConnectionButton />
                            <FacebookConnectionButton />
                            <GithubConnectionButton />
                        </div>
                    </form>
                </>
            ) }
        </LeftSide>
    )
}

export default SignUpComponent;
